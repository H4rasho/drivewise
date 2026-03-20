import { db } from "./client";
import { signals, rules, parkingTips, maintenanceItems, careChecklist } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Parking tips
  await db.insert(parkingTips).values([
    {
      title: "Estacionamiento en Paralelo",
      type: "paralelo",
      steps: [
        { order: 1, instruction: "Posiciónate paralelo al auto de adelante, a unos 50-80cm de distancia.", tip: "Deja espacio suficiente para maniobrar." },
        { order: 2, instruction: "Retrocede girando el volante hacia la derecha hasta que veas el bordillo en el espejo izquierdo.", tip: "Observa constantemente todos los espejos." },
        { order: 3, instruction: "Gira el volante hacia la izquierda y continúa retrocediendo hasta quedar paralelo al bordillo.", tip: "El auto debe quedar a 20-30cm del bordillo." },
        { order: 4, instruction: "Centra el auto en el espacio dejando distancia pareja con los autos de adelante y atrás.", tip: "Si necesitas más espacio, avanza y retrocede de nuevo." },
      ],
    },
    {
      title: "Estacionamiento en Batería",
      type: "bateria",
      steps: [
        { order: 1, instruction: "Pasa el espacio disponible y posiciónate a 1-1.5m de los autos estacionados.", tip: "Esto te da ángulo suficiente para entrar." },
        { order: 2, instruction: "Retrocede girando el volante completamente hacia el espacio.", tip: "Mantén la velocidad muy baja." },
        { order: 3, instruction: "Cuando el auto esté alineado con el espacio, endereza el volante y termina de entrar.", tip: "Asegúrate de que los retrovisores no toquen los autos vecinos." },
        { order: 4, instruction: "Verifica que quedaste centrado en el espacio antes de apagar el motor.", tip: "Deja espacio parejo a cada lado." },
      ],
    },
    {
      title: "Estacionamiento en Diagonal",
      type: "diagonal",
      steps: [
        { order: 1, instruction: "Identifica el espacio y posiciónate a 1.5-2m de distancia de los autos estacionados.", tip: "El ángulo usual es de 45-60 grados." },
        { order: 2, instruction: "Gira el volante hacia el espacio y avanza lentamente al ángulo del cajón.", tip: "Mira el espacio de frente para alinear." },
        { order: 3, instruction: "Endereza el volante cuando el auto esté alineado con el espacio y entra completamente.", tip: "Asegúrate de no sobrepasar la línea frontal." },
      ],
    },
    {
      title: "Estacionamiento en Pendiente",
      type: "pendiente",
      steps: [
        { order: 1, instruction: "En pendiente hacia arriba con bordillo: gira las ruedas HACIA AFUERA (izquierda).", tip: "Si el auto resbala, las ruedas se apoyan en el bordillo." },
        { order: 2, instruction: "En pendiente hacia abajo con bordillo: gira las ruedas HACIA EL BORDILLO (derecha).", tip: "El bordillo bloquea el movimiento hacia adelante." },
        { order: 3, instruction: "Sin bordillo en cualquier pendiente: gira las ruedas hacia la orilla de la calzada.", tip: "El auto se desplazaría hacia el lado de la calzada si falla el freno." },
        { order: 4, instruction: "Siempre activa el freno de mano y deja el auto en marcha (o en P en automático).", tip: "El freno de mano es el respaldo principal." },
      ],
    },
  ]).onConflictDoNothing();

  // Maintenance items
  await db.insert(maintenanceItems).values([
    { name: "Cambio de aceite", description: "Reemplaza el aceite del motor y el filtro para mantener el motor lubricado y libre de impurezas.", frequency: "por_kilometraje", kmInterval: 5000 },
    { name: "Revisión de neumáticos", description: "Verifica presión, desgaste y estado general de los neumáticos.", frequency: "mensual", kmInterval: null },
    { name: "Rotación de neumáticos", description: "Intercambia los neumáticos de posición para lograr un desgaste uniforme.", frequency: "por_kilometraje", kmInterval: 10000 },
    { name: "Revisión de frenos", description: "Inspecciona pastillas, discos y líquido de frenos.", frequency: "semestral", kmInterval: null },
    { name: "Cambio de filtro de aire", description: "Reemplaza el filtro de aire del motor para garantizar una mezcla aire-combustible óptima.", frequency: "anual", kmInterval: null },
    { name: "Revisión de líquido refrigerante", description: "Verifica el nivel y estado del líquido refrigerante del motor.", frequency: "semestral", kmInterval: null },
    { name: "Revisión de batería", description: "Comprueba el estado de la batería y los terminales.", frequency: "anual", kmInterval: null },
    { name: "Revisión técnica", description: "Inspección técnica obligatoria del vehículo.", frequency: "anual", kmInterval: null },
  ]).onConflictDoNothing();

  // Care checklist
  await db.insert(careChecklist).values([
    { title: "Revisar nivel de aceite", description: "Con el motor frío, extrae la varilla y verifica que el nivel esté entre MIN y MAX.", category: "motor" },
    { title: "Revisar presión de neumáticos", description: "La presión recomendada está en el manual o en el pilar de la puerta del conductor.", category: "neumaticos" },
    { title: "Revisar líquido de frenos", description: "El depósito está en el compartimento del motor. Verifica que esté entre MIN y MAX.", category: "frenos" },
    { title: "Revisar líquido limpiaparabrisas", description: "Mantén el depósito lleno con agua desmineralizada o líquido específico.", category: "exterior" },
    { title: "Revisar luces delanteras y traseras", description: "Enciende el auto y verifica que todas las luces funcionen: posición, cruce, carretera, freno y reversa.", category: "electrico" },
    { title: "Revisar estado del parabrisas", description: "Busca grietas, astillas o manchas que puedan afectar la visibilidad.", category: "exterior" },
    { title: "Revisar nivel de combustible", description: "Nunca dejes el tanque por debajo de 1/4 para evitar daños a la bomba.", category: "motor" },
  ]).onConflictDoNothing();

  // Signals
  await db.insert(signals).values([
    { name: "Pare", category: "regulatoria", description: "Detención total obligatoria. Debes detener el vehículo completamente antes de la línea de detención.", mnemonic: "Octágono rojo = detención TOTAL, aunque no haya nadie." },
    { name: "Ceda el paso", category: "regulatoria", description: "Reduce la velocidad y cede el paso a los vehículos que circulan por la vía prioritaria.", mnemonic: "Triángulo invertido = cede, no te detengas obligatoriamente." },
    { name: "No entre", category: "regulatoria", description: "Prohibido el ingreso a la vía en esa dirección.", mnemonic: "Círculo rojo con barra horizontal blanca = no puedes entrar." },
    { name: "Velocidad máxima", category: "regulatoria", description: "Indica la velocidad máxima permitida en la vía.", mnemonic: "El número dentro del círculo rojo es el límite que no debes superar." },
    { name: "Estacionamiento prohibido", category: "regulatoria", description: "Prohibido estacionar en este sector.", mnemonic: "P tachada = no puedes dejar el auto aquí." },
    { name: "Curva a la derecha", category: "preventiva", description: "Advierte que hay una curva hacia la derecha en la vía.", mnemonic: "Flecha amarilla doblada = prepárate para girar." },
    { name: "Zona escolar", category: "preventiva", description: "Advierte la proximidad de una escuela. Reduce la velocidad y extrema precauciones.", mnemonic: "Siluetas de niños = máxima atención, velocidad reducida." },
    { name: "Cruce de peatones", category: "preventiva", description: "Advierte la presencia de un paso de peatones en la vía.", mnemonic: "Silueta de persona caminando = precaución con peatones." },
  ]).onConflictDoNothing();

  // Rules
  await db.insert(rules).values([
    { title: "Velocidad máxima en zona urbana", category: "velocidad", content: "La velocidad máxima permitida en zonas urbanas es de 60 km/h, salvo señalización en contrario. En zonas escolares y hospitalarias se reduce a 30 km/h.", legalRef: "Art. 145 Ley de Tránsito" },
    { title: "Velocidad máxima en carretera", category: "velocidad", content: "La velocidad máxima en carreteras y caminos es de 120 km/h para automóviles, salvo señalización en contrario.", legalRef: "Art. 145 Ley de Tránsito" },
    { title: "Prioridad en cruce sin señalización", category: "preferencia", content: "En un cruce sin señalización, tiene preferencia el vehículo que viene por la derecha.", legalRef: "Art. 148 Ley de Tránsito" },
    { title: "Cinturón de seguridad", category: "documentacion", content: "El uso del cinturón de seguridad es obligatorio para el conductor y todos los pasajeros, tanto en asientos delanteros como traseros.", legalRef: "Art. 75 Ley de Tránsito" },
    { title: "Alcoholemia permitida", category: "alcoholemia", content: "El límite máximo de alcohol en sangre es de 0,3 gramos por litro (0,3 g/L) para conductores y de 0,0 g/L para conductores novatos y transporte de pasajeros.", legalRef: "Art. 196 Ley de Tránsito" },
    { title: "Estacionamiento en doble fila", category: "estacionamiento", content: "Está prohibido estacionar en doble fila. El vehículo debe quedar junto al bordillo, paralelo a él, sin obstruir el tráfico.", legalRef: "Art. 155 Ley de Tránsito" },
  ]).onConflictDoNothing();

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
