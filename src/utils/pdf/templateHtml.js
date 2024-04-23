const { formatDate, formatTime, calculateAge, getDuration } = require("./formatDate");
const logo = `<svg id="Camada_2" data-name="Camada 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.42 95.84" width="40" height="30">
<defs>
  <style>
    .cls-1 {
      fill: #0baaff;
    }

    .cls-1, .cls-2 {
      stroke-width: 0px;
    }

    .cls-2 {
      fill: #06a8ff;
    }
  </style>
</defs>
<g id="Layer_1" data-name="Layer 1">
  <path class="cls-1" d="M126.42,54.51c0,2.37,0,4.74-.35,7.54-6,6.4-10.94,13.31-17.42,18.16-19.78,14.79-41.89,19.2-66.06,12.73-16.54-4.43-29.92-13.33-40.29-26.83-3.35-4.36-2.94-11.6.56-15.74,5.89-6.95,14.49-7.13,21.18.28,11.86,13.15,26.3,19.65,43.98,17.75,12.06-1.3,22.72-5.91,30.38-15.91,0,0,.02.01.34-.08,1.15-.9,1.99-1.7,2.82-2.51,7.8-7.62,16.33-6.62,22.39,2.55.56.85,1.64,1.37,2.47,2.05Z"/>
  <path class="cls-2" d="M77.73.29c7.67-.88,12.39,2.85,15.96,8.57,4.17,6.69,1.78,13.14-1.94,18.69-6.73,10.06-16.01,17.7-26.17,24.14-1.57,1-4.88.97-6.46-.04-10.58-6.72-20.08-14.74-26.75-25.56-4.45-7.22-3.44-16.15,2.08-21.5,7.05-6.83,18.64-5.95,24.56,1.88.96,1.27,1.87,2.57,2.36,3.23,5.67-3.35,10.8-6.39,16.37-9.42Z"/>
</g>
</svg>`;

function getTemplate(data) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            body {
                font-family: "Arial", sans-serif;
            }
            .container {
                width: 90%;
                margin: 0 auto;
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        .header img {
          width: 40px;
          margin-right: 10px;
        }
        .content {
          border: 1px solid #adadad;
          padding: 20px;
          margin-top: 20px;
          border-radius: 10px;
        }
        p {
          margin: 5px 0;
        }
        .bold {
          font-weight: bold;
        }
        .title {
          font-size: 1.1em;
          font-weight: bold;
        }
        h1 {	
          margin-left: 20px;
        }
        h2 {	
          text-align: center;
          margin-bottom: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${logo} 
          <h1>BlueMed Appointments</h2>
        </div>
        <br>
        <h2>Consulta Marcada</h2>
        <br>
        <h3>Dados do Paciente</h3>
        <div class="content">
          <p><span class="bold">Nome:</span> ${data.user.name}</p>
          <p><span class="bold">ID:</span> ${data.user.id}</p>
          <p><span class="bold">Sexo:</span> ${data.user.sex === "M" ? "Masculino" : data.user.sex === "F" ? "Feminino" : "Outro"}</p>
          <p><span class="bold">Data de Nascimento:</span> ${formatDate(data.user.birthDate)}</p>
          <p><span class="bold">Idade:</span> ${calculateAge(data.user.birthDate)}</p>
        </div>
        <h3>Detalhes da Consulta</h3>
        <div class="content">
          <p><span class="bold">Médico:</span> ${data.doctorName}</p>
          <p><span class="bold">Especialidade:</span> ${data.specialtyName}</p>
          <p><span class="bold">Data Marcada:</span> ${formatDate(data.appointmentDate)}</p>
          <p><span class="bold">Horário de Ínicio:</span> ${formatTime(data.appointmentInitialTime)}</p>
          <p><span class="bold">Horário de Término:</span> ${formatTime(data.appointmentFinalTime)}</p>
          </div>
          <h3>Queixa Principal</h3>
          <div class="content">
            <p>${data.reason}</p>
        </div>
      </body>
    </html>
  `;
  return htmlTemplate;
}

module.exports = { getTemplate };
