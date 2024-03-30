//clase que se encarga de generar preguntas automaticamente

const cron = require('node-cron');
const QuestionGenerator = require('./questionGeneration');
const questionGenerator = new QuestionGenerator();


class Scheduler {

    constructor() {
        this.start();
    }

    async generarPregunta() {
        try {
            await questionGenerator.ejecutarOperaciones(); //Generamos la pregunta
        } catch (error) {
            console.error(error);
        }
    }

    start() {
        cron.schedule('*/30 * * * *', async () => {
            try {
                await this.generarPregunta();
            }
            catch (error) {
                console.error('Fallo al generar la pregunta:', error);
            }
        });
    }
}

module.exports = Scheduler;