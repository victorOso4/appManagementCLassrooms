/** Patron proxy
 * Actúa como intermediario para controlar el acceso a rutas protegidas
 * Verifica permisos basados en el rol del usuario
 * Se usa como middleware en authRoutes.js para proteger rutas administrativas: 
 */

module.exports = function proxyAuth(req, res, next) {
  const user = req.user;

  if (!user || user.id_rol !== 1) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  next();
};