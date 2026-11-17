# EvoTrain · El saber de entrenar

Demo interactiva para pitch de **EvoTrain**, una aplicación web de entrenamiento físico para principiantes diseñada para erradicar la improvisación en el gimnasio mediante metodologías estructuradas, sobrecarga progresiva científica (RIR) y seguimiento visual de métricas.

Cuenta con un **modelo freemium**: acceso gratuito completo durante las primeras 6 semanas; a partir de la semana 7 y el historial avanzado se requiere suscripción Premium.

---

## Cómo correrlo en Windows (PowerShell)

Requisitos: Node.js (v18+) y npm instalados.

```powershell
# 1. Ingresar a la carpeta del proyecto
Set-Location -Path "C:\dev\proyecto_gimnasio"

# 2. Instalar dependencias (incluye fuentes @fontsource para uso offline)
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. (Opcional) Probar compilación para producción
npm run build
```

Abre tu navegador en `http://localhost:5173/`.

---

## Rutas de la aplicación

- `/`: **Landing page** pública con propuesta de valor, cifras del piloto, problema que resuelve, planes y llamada a la acción.
- `/registro`: Formulario de creación de perfil en 3 pasos con validación de medidas y selección de objetivo y días por semana.
- `/app`: **Inicio (Dashboard)** con saludo, racha de sesiones, entrenamiento del día, métricas calculadas (constancia, volumen semanal vs anterior, carga en press banca), progreso del bloque y consejo pedagógico.
- `/app/hoy`: Rutina detallada del día con ejercicios, series, RIR objetivo, justificación científica y botón directo para registrar cada ejercicio.
- `/app/sesion`: Registro interactivo de sesión con selector de ejercicios, tabla editable de series (peso, reps, RIR), cálculo de última sesión y sugerencia de sobrecarga progresiva.
- `/app/progreso`: Gráficas interactivas con Recharts (volumen total por semana, peso levantado y repeticiones) y tarjetas de peso/volumen inicial y final basadas en el historial del piloto (Remo en T, semanas 1 a 8).
- `/app/metodologia`: Estructura del bloque de 4 semanas (RIR 3, RIR 2, RIR 1, AMRAP), calendario semanal detallado y explicación didáctica de qué es el RIR.
- `/app/premium`: Pantalla de conversión freemium con aviso de semana 7 bloqueada, tarjeta de historial avanzado atenuada, 3 planes de suscripción y modal interactivo de **pago simulado**.
- `/app/feedback`: Formulario para registrar la opinión del usuario (claridad de la guía de 1 a 5, preguntas de validación, comentarios y agradecimiento persistido).

---

## Panel de Demo para el Pitch

En la esquina inferior derecha de la pantalla encontrarás un botón flotante circular con el ícono **▶**:

1. **Cargar datos de ejemplo**: Configura inmediatamente el perfil de Juan (principiante, 5 días/semana) y 8 semanas de historial registrado, llevándote al Dashboard.
2. **Ir a semana 7 (mostrar Premium)**: Permite mostrar a los evaluadores o inversionistas el punto de fricción freemium donde la semana 7 se encuentra bloqueada invitando al usuario a suscribirse.
3. **Volver a semana 3**: Regresa al usuario a la semana activa de su bloque con métricas y entrenamiento disponible.
4. **Reiniciar demo**: Borra el estado de `localStorage` y regresa a la landing inicial.
