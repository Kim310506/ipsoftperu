export const estadisticasVisitas = {
  pendientes: 3,
  aprobados: 22,
  visitas: 26,
};

export const visitasData = [

  {
    id: 1,

    codigo: "V202602110001",

    tipo: "INTERNO",

    sedeId: 101,

    ambienteId: 100001,

    /* FECHAS */
    fecha: "2026-02-11",

    /* HORARIOS */
    horaEntrada: "08:00:00",

    horaSalida: "18:00:00",

    motivo: "REUNION",

    estado: "AUTORIZADO",

    autorizado: "RESPONSABLE DE AREA AREQUIPA",

    visitantes: [

      {
        id: 1,

        dni: "72818181",

        nombres: "Juan Carlos",

        apellidoPaterno: "Perez",

        apellidoMaterno: "Soto",

        email: "juan@gmail.com",

        telefono: "999888777",

        empresa: "IPSOFT",

        qr: "qr_juan.png",

        estadoQr: "ENVIADO",
      },

      {
        id: 2,

        dni: "71717171",

        nombres: "Maria Fernanda",

        apellidoPaterno: "Lopez",

        apellidoMaterno: "Diaz",

        email: "maria@gmail.com",

        telefono: "988777666",

        empresa: "IPSOFT",

        qr: "qr_maria.png",

        estadoQr: "GENERADO",
      },

    ],

  },

];