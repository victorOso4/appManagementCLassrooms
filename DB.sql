CREATE TABLE proyecto.roL (
    id_rol INT NOT NULL PRIMARY KEY,
    descripcion TEXT NOT NULL UNIQUE CHECK (length(descripcion) > 3)
);

CREATE TABLE proyecto.usuario (
    id_gmail TEXT PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre TEXT NOT NULL CHECK (nombre <> ''),
    apellido TEXT NOT NULL CHECK (apellido <> ''),
    CONSTRAINT fk_usuario_rol 
        FOREIGN KEY (id_rol) 
        REFERENCES proyecto.rol (id_rol)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE proyecto.estudiante (
    id_estudiante INT NOT NULL PRIMARY KEY,
    id_gmail TEXT UNIQUE REFERENCES proyecto.usuario(id_gmail) ON DELETE SET NULL ON UPDATE CASCADE,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL
);

CREATE TABLE proyecto.docente (
    id_docente INT NOT NULL PRIMARY KEY,
    id_gmail TEXT UNIQUE REFERENCES proyecto.usuario(id_gmail) ON DELETE SET NULL ON UPDATE CASCADE,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL
);

CREATE TABLE proyecto.asignatura (
    id_asignatura INT NOT NULL,
    id_estudiante INT NOT NULL,
    id_docente INT NOT NULL,
    descripcion TEXT NOT NULL CHECK (length(descripcion) > 5),
    CONSTRAINT fk_asignatura_estudiante
        FOREIGN KEY (id_estudiante) 
        REFERENCES proyecto.estudiante (id_estudiante)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_asignatura_docente
        FOREIGN KEY (id_docente)
        REFERENCES proyecto.docente (id_docente)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE proyecto.ubicacion (
    id_ubicacion INT NOT NULL PRIMARY KEY,
    edificio TEXT NOT NULL,
    piso INT NOT NULL CHECK (piso >= 0),
    descripcion TEXT
);

CREATE TABLE proyecto.aula (
    id_aula INT NOT NULL PRIMARY KEY,
    id_asignatura INT NOT NULL,
    id_ubicacion INT NOT NULL,
    capacidad INT NOT NULL CHECK (capacidad > 0),
    CONSTRAINT fk_aula_asignatura
        FOREIGN KEY (id_asignatura)
        REFERENCES proyecto.asignatura (id_asignatura)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_aula_ubicacion
        FOREIGN KEY (id_ubicacion)
        REFERENCES proyecto.ubicacion (id_ubicacion)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);