class PatientCard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return ['paciente', 'especie','fecha','sintomas', 'state']
    }
    connectedCallback(){
        this.paciente = this.getAttribute('paciente');
      this.especie = this.getAttribute('especie');
      this.fecha = this.getAttribute('fecha');
      this.sintomas = this.getAttribute('sintomas');
      this.render();
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        this.remove();
      });
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }

    toggleTask(){
        this.state = !this.state
       
        this.render()
        
    }

    

    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles.css">
        <li class=${this.state ? "completed" : "task"}>
            <h3>${this.paciente}</h3>
            <p>${this.especie}</p>
            <p>${this.fecha}</p>
            <p>${this.sintomas}</p>
            <p>${!this.state ? "Pendiente" : "Completada"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="task-checkbox">
            </br>
            <button>Borrar</button>
            

        </li>
        `

        const checkbox = this.shadowRoot.querySelector('.task-checkbox')
        checkbox.addEventListener('change', () => this.toggleTask())
    }
}

customElements.define('patient-card', PatientCard)
export default PatientCard