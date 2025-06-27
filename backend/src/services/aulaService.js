const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const Aula = require('../models/classroom');
const Ubicacion = require('../models/location');
const Asignatura = require('../models/subject');
const Estudiante = require('../models/students');


require('dotenv').config();


const QR_FOLDER = path.join(__dirname, '..', 'public', 'qrs');
class AulaService {



    async createAula({ nombre, id_asignatura, id_ubicacion, capacidad_foro }) {
        if (!nombre || !id_asignatura || !id_ubicacion) {
            throw new Error('Todos los campos son requeridos');
        }

        const aulaExistente = await Aula.findOne({
            where: { nombre, id_asignatura, id_ubicacion }
        });

        if (aulaExistente) {
            throw new Error('Ya existe un aula con el mismo nombre, asignatura y ubicación');
        }

        // Crear aula
        const nuevaAula = await Aula.create({
            nombre,
            id_asignatura,
            id_ubicacion,
            capacidad_foro: capacidad_foro || 0
        });

        // Asegurar que la carpeta de QR exista
        if (!fs.existsSync(QR_FOLDER)) {
            fs.mkdirSync(QR_FOLDER, { recursive: true });
        }

        // Generar código QR
        const qrData = `Aula: ${nuevaAula.nombre} - ID: ${nuevaAula.id_aula}`;
        const nombreSanitizado = this.sanitizeFilename(nuevaAula.nombre);
        const qrFilename = `qr_${nuevaAula.id_aula}_${nombreSanitizado}.png`;
        const qrPath = path.join(QR_FOLDER, qrFilename);

        await QRCode.toFile(qrPath, qrData);

        // Guardar nombre del archivo QR en BD
        await nuevaAula.update({ codigo_qr: qrFilename });

        return nuevaAula;
    }

    sanitizeFilename(name) {
    return name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
    }

    async getAulas() {
        return await Aula.findAll({
            include: [
                { model: Asignatura, as: 'asignatura', attributes: ['id_asignatura', 'nombre'] },
                { model: Ubicacion, as: 'ubicacion', attributes: ['id_ubicacion', 'nombre'] }
            ]
        });
    }

    async updateAula(id_aula, { id_asignatura, id_ubicacion, nombre, capacidad_foro }) {
        const aula = await Aula.findByPk(id_aula);
        if (!aula) throw new Error('Aula no encontrada');

        await aula.update({ id_asignatura, id_ubicacion, nombre, capacidad_foro });

        return aula;
    }

    async deleteAula(id_aula) {
        const aula = await Aula.findByPk(id_aula);
        if (!aula) throw new Error('Aula no encontrada');

        await aula.destroy();
        return true;
    }

    async getUbicaciones() {
        return await Ubicacion.findAll({ attributes: ['id_ubicacion', 'nombre'] });
    }
    async getCuposDisponibles(idAula) {
        const aula = await Aula.findByPk(idAula);
        if (!aula) throw new Error('Aula no encontrada');

        const idAsignatura = aula.id_asignatura;

        // Contar estudiantes que tengan esta asignatura
        const estudiantesEnAula = await Estudiante.count({
            include: {
                model: Asignatura,
                as: 'asignaturas',
                where: { id_asignatura: idAsignatura },
            }
        });

        const disponibles = aula.capacidad_foro - estudiantesEnAula;

        return {
            foro_total: aula.capacidad_foro,
            inscritos: estudiantesEnAula,
            disponibles: Math.max(0, disponibles)
        };
    }
}

module.exports = new AulaService();
