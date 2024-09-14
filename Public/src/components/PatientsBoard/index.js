import '../PatientCard/index.js'

class PatientBoard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        this.patients = []
        this.pendents = []
        
        
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot.querySelector('.patient-form')
        form.addEventListener("submit", (e)=>{
            e.preventDefault()
        
            const paciente = this.shadowRoot.querySelector('.input-paciente').value
            const especie = this.shadowRoot.querySelector('.input-especie').value
            const fecha = this.shadowRoot.querySelector('.input-fecha').value
            const sintomas = this.shadowRoot.querySelector('.input-sintomas').value

            this.patients.push({paciente, especie, fecha, sintomas, state: false})

            this.addPatient({paciente, especie, fecha, sintomas, state: false})

            this.pendents.push({paciente, especie, fecha, sintomas, state: true})
            this.addPendent({paciente, especie, fecha, sintomas, state: true})
            
            form.reset()
        })
    }

    

    render(){
        this.shadowRoot.innerHTML = `
        <h2>Formulario Paciente</h2>
        <form class="patient-form">
            <input type="text" placeholder="Paciente" class="input-paciente" required>
            <input type="text" placeholder="Especie" class="input-especie" required>
            <input type="date" placeholder="Fecha de ingreso" class="input-fecha" required>
            <input type="text" placeholder="Sintomas" class="input-sintomas" required>
            <button>Agregar paciente</button>
        </form>
        <ul class="patients-container">
        </ul>
        <ul class="pendents-container">
        </ul>
        `

        this.patients.forEach(patient => this.addPatient(patient))
    }

    addPatient({paciente, especie, fecha, sintomas, state}){
        
        const patientsContainer = this.shadowRoot.querySelector('.patients-container')
        patientsContainer.innerHTML += `
        <patient-card paciente="${paciente}" especie="${especie}" fecha="${fecha}" sintomas="${sintomas}" state="${state}"></patient-card>
        `

    }

    addPendent({paciente, especie, fecha, sintomas, state}){
        
        const patientsContainer = this.shadowRoot.querySelector('.pendents-container')
        patientsContainer.innerHTML += `
        <patient-card paciente="${paciente}" especie="${especie}" fecha="${fecha}" sintomas="${sintomas}" state="${state}"></patient-card>
        `

    }



}

customElements.define('patient-board', PatientBoard)
export default PatientBoard