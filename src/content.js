export const BOOK = {
  author: 'Elisabeth Kübler-Ross',
  title: 'Sobre la muerte y los moribundos: Alivio del sufrimiento psicológico',
  edition: 'Edición digital en español, 2017',
  translator: 'Neri Daurella',
};

export const LIMITS = 'Esta guía es educativa. El cuestionario no es una prueba validada, no ofrece un diagnóstico y no sustituye el acompañamiento profesional.';
export const NONLINEAR = 'Las fases pueden coexistir, repetirse o no aparecer. No tienes que pasar por todas.';
export const PROFESSIONAL_SUPPORT = 'Si el malestar te resulta difícil de sostener o interfiere con tu vida diaria, considera hablar con un profesional de salud mental.';
export const URGENT_SUPPORT = 'Si hay peligro inmediato, llama a emergencias de tu localidad. En Bogotá, el número es el 123.';
export const SUPPORT_SOURCE = 'https://bogota.gov.co/mi-ciudad/salud/senales-de-alarma-despues-de-sismo-o-terremoto-y-cuando-ir-urgencias';

export const PHASES = [
  {
    id: 'negacion',
    label: 'Negación',
    bookTitle: 'Negación y aislamiento',
    chapter: 3,
    page: 35,
    color: '#5b5295',
    tint: '#eeebfb',
    preview: 'Cuesta creer o asimilar lo ocurrido.',
    description: 'A veces una noticia difícil se siente irreal. Hacer pequeñas pausas o tomar distancia puede darte tiempo para asimilarla, incluso si en otros momentos sí puedes hablar de lo ocurrido.',
    signs: ['Sentir que lo ocurrido todavía no parece real.', 'Necesitar silencio o espacio antes de hablar de ello.', 'Reconocer lo ocurrido en algunos momentos y en otros no.'],
    reflection: 'La incredulidad o la necesidad de tomar distancia aparecen con más fuerza en tus respuestas. Puedes acercarte a lo ocurrido poco a poco, sin forzarte a hablar de todo hoy.',
    tips: [
      { title: 'Date permiso de ir despacio', text: 'Elige un hecho que hoy puedas nombrar. Puedes escribirlo o decirlo en voz baja, sin obligarte a contar toda la historia.' },
      { title: 'Pon un límite con cuidado', text: 'Si alguien quiere hablar y no te sientes listo, prueba decir: «Agradezco que estés aquí. Hoy prefiero hablar de esto solo un momento».' },
    ],
  },
  {
    id: 'ira',
    label: 'Ira',
    bookTitle: 'Ira',
    chapter: 4,
    page: 43,
    color: '#a34e3b',
    tint: '#faeee8',
    preview: 'Aparecen el enfado o la sensación de injusticia.',
    description: 'Una pérdida puede despertar rabia, frustración o resentimiento. El enojo no siempre tiene un destinatario claro: también puede aparecer en situaciones cotidianas que antes no te molestaban.',
    signs: ['Preguntarte por qué tuvo que pasar.', 'Sentir frustración ante los cambios que no elegiste.', 'Notar que te irritas con más facilidad al recordar lo ocurrido.'],
    reflection: 'El enojo o la sensación de injusticia sobresalen en tus respuestas. Reconocer la rabia puede ayudarte a expresar lo que necesitas sin actuar impulsivamente.',
    tips: [
      { title: 'Haz una pausa antes de responder', text: 'Si notas tensión, toma distancia unos minutos si puedes. Pregúntate qué fue lo más difícil de ese momento antes de retomar la conversación.' },
      { title: 'Dale una salida segura al enojo', text: 'Escribe unas líneas sin enviarlas o habla con alguien que pueda escucharte sin juzgar. Si te ayuda, empieza por «Lo que más me enoja es…».' },
    ],
  },
  {
    id: 'pacto',
    label: 'Pacto',
    bookTitle: 'Pacto',
    chapter: 5,
    page: 67,
    color: '#89611e',
    tint: '#faf0dc',
    preview: 'Te preguntas si algo pudo ser distinto.',
    description: 'El libro describe el pacto, también llamado negociación, como un intento de ganar tiempo ante lo inevitable. Después de una pérdida, puede parecerse a imaginar cómo habría cambiado todo si algo se hubiera hecho de otra manera.',
    signs: ['Dar vueltas a un «si tan solo…».', 'Imaginar promesas o condiciones que cambiarían el desenlace.', 'Preguntarte qué estaba realmente en tus manos.'],
    reflection: 'En tus respuestas destacan los «¿y si…?» o las ganas de cambiar lo que pasó. Imaginar otros desenlaces puede ser una forma de buscar algo de control ante lo incierto.',
    tips: [
      { title: 'Separa lo que sabías de lo que sabes hoy', text: 'Escribe uno de tus «¿y si…?». Anota qué información y opciones tenías en ese momento, sin exigirle a tu yo de entonces que supiera lo que sabes ahora.' },
      { title: 'Elige algo que sí puedas decidir', text: 'Busca una acción pequeña para hoy: pedir apoyo, poner un límite o reservar unos minutos de descanso. No hace falta resolver el pasado para dar ese paso.' },
    ],
  },
  {
    id: 'tristeza',
    label: 'Tristeza',
    bookTitle: 'Depresión',
    chapter: 6,
    page: 70,
    color: '#426783',
    tint: '#e9f1f8',
    preview: 'Se siente con más fuerza el dolor de la pérdida.',
    description: 'La autora usa el término «depresión» para describir el dolor ante pérdidas ya vividas o que se anticipan al final de la vida. Aquí usamos «tristeza» para hablar de esa vivencia sin confundirla con un diagnóstico de depresión clínica.',
    signs: ['Sentir con fuerza la ausencia o lo que ha cambiado.', 'Tener menos energía o ganas de hacer cosas habituales.', 'Preferir compañía tranquila antes que consejos o frases de ánimo.'],
    reflection: 'La tristeza o el peso de la ausencia destacan en tus respuestas. No necesitas animarte a la fuerza. Puede ayudarte bajar el ritmo y pedir el tipo de compañía que te haga bien.',
    tips: [
      { title: 'Pide compañía sin tener que hablar', text: 'Si te apetece estar con alguien, puedes decir: «Hoy me vendría bien que me acompañaras. No necesito consejos, solo un rato de compañía».' },
      { title: 'Simplifica lo que te pides hoy', text: 'Elige una tarea de cuidado básica, como preparar algo de comer, descansar o pedir ayuda con un pendiente. Con una basta para empezar.' },
    ],
  },
  {
    id: 'aceptacion',
    label: 'Aceptación',
    bookTitle: 'Aceptación',
    chapter: 7,
    page: 91,
    color: '#3d745b',
    tint: '#e8f3ec',
    preview: 'Puedes reconocer lo ocurrido, aunque aún duela.',
    description: 'Aceptar no significa estar de acuerdo, olvidar ni dejar de sentir dolor. Puedes empezar a reconocer lo ocurrido y encontrar momentos de calma al mismo tiempo que sigues extrañando lo que perdiste.',
    signs: ['Reconocer el cambio sin sentir que tienes que justificarlo.', 'Encontrar pequeños momentos de calma en el día.', 'Volver a algo que te importa sin negar lo que sientes.'],
    reflection: 'Reconocer lo ocurrido y encontrar ratos de calma aparece con fuerza en tus respuestas. Eso no borra lo perdido ni te obliga a sentirte igual mañana.',
    tips: [
      { title: 'Cuida algo que te importa', text: 'Si quieres, reserva un momento para un recuerdo, un vínculo o una actividad que tenga sentido para ti en esta nueva situación.' },
      { title: 'Deja espacio para los días difíciles', text: 'Si regresa la tristeza o el enojo, puedes reconocerlo y pedir apoyo. Ese día no invalida los momentos en los que has sentido calma.' },
    ],
  },
];

// Cada fase tiene dos afirmaciones. Se intercalan para no sugerir una secuencia del duelo.
export const QUESTIONS = [
  { phase: 'negacion', text: 'Me cuesta creer que lo ocurrido sea real.' },
  { phase: 'tristeza', text: 'Siento con fuerza la ausencia o lo que ha cambiado.' },
  { phase: 'pacto', text: 'Me descubro pensando en lo que podría haber hecho de otra manera.' },
  { phase: 'aceptacion', text: 'Puedo reconocer lo que pasó, aunque todavía me duela.' },
  { phase: 'ira', text: 'Al pensar en lo ocurrido, siento rabia o que ha sido injusto.' },
  { phase: 'pacto', text: 'Imagino qué tendría que haber pasado para que las cosas fueran distintas.' },
  { phase: 'ira', text: 'Me irrito con más facilidad cuando recuerdo lo ocurrido.' },
  { phase: 'negacion', text: 'Por momentos necesito apartar de mi mente lo ocurrido porque aún me abruma.' },
  { phase: 'tristeza', text: 'El dolor de lo ocurrido me deja con menos ganas de hacer lo que normalmente me importa.' },
  { phase: 'aceptacion', text: 'Encuentro pequeños momentos de calma mientras me adapto a lo que cambió.' },
];

export const OPTIONS = [
  { value: 0, label: 'Nada', detail: 'No me describe' },
  { value: 1, label: 'Un poco', detail: 'Me describe poco' },
  { value: 2, label: 'Bastante', detail: 'Me describe bastante' },
  { value: 3, label: 'Mucho', detail: 'Me describe muy bien' },
];

export const GENERAL_TIPS = [
  { title: 'Ponle palabras a lo que sientes', text: 'Si te resulta útil, completa una frase en privado: «Hoy lo más difícil es… y lo que necesito es…». No hace falta que encuentres una etiqueta.' },
  { title: 'Comparte una necesidad concreta', text: 'Piensa en alguien de confianza y pide algo sencillo, como una llamada corta, un paseo o ayuda con una tarea.' },
];
