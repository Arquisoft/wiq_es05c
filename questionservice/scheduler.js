//clase que se encarga de generar preguntas automaticamente

const cron = require('node-cron');
const QuestionGenerator = require('./questionGeneration');
const questionGenerator = new QuestionGenerator();

const ObtenerPreguntaDiaria = require('./obtenerPreguntasBaseDatos');
const obtenerPreguntaDiaria = new ObtenerPreguntaDiaria();


class Scheduler {

    constructor() {
        this.job1 = null;
        this.job2 = null;
        this.start();
    }

    async generarPregunta() {
        try {
            await questionGenerator.ejecutarOperaciones(); //Generamos la pregunta
        } catch (error) {
            console.error(error);
        }
    }

    async generarPreguntaDiaria() {
        try {
            const fecha = new Date(); // Obtenemos la fecha actual
            // como nos da tambien la hora y no queremos eso, la eliminamos
            const año = fecha.getFullYear();
            const mes = fecha.getMonth() + 1;
            const dia = fecha.getDate();
            // Formateamos la fecha para que sea compatible con la base de datos
            const fechaSinHora = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

            await obtenerPreguntaDiaria.generarPreguntaDiaria(fechaSinHora); //Generamos la pregunta diaria
        } catch (error) {
            console.error(error);
        }
    }


    start() {
        this.job1 = cron.schedule('*/15 * * * *', async () => {
            try {
                await this.generarPregunta();
            }
            catch (error) {
                console.error('Fallo al generar la pregunta:', error);
            }
        });

        //para generar la pregunta diaria
        
        this.job2 = cron.schedule('0 0 */1 * *', async () => {
            try {
                await this.generarPreguntaDiaria();
            }
            catch (error) {
                console.error('Fallo al generar la pregunta diaria:', error);
            }
        });
    }

    stop() {
        if (this.job1) {
            this.job1.stop();
        }
        if (this.job2) {
            this.job2.stop();
        }
    }
}

module.exports = Scheduler;