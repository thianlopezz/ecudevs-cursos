import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './ContactoForm.css'
import Axios from 'axios'
import { proxyConfig } from '../../helpers/proxyConfig'

class ContactoForm extends React.Component {
  static defaultProps = {
    name: 'Formulario de contacto',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage:
      'Gracias por escribirnos, nos pondremos en contacto contigo lo mas pronto posible.',
    errorMessage:
      '¡Ups! No hemos podido recibir tu mensaje, pero no te preocupes, intenta contactarnos por correo electrónico.'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })

    Axios.post(`${proxyConfig.url}/api/mensajeContacto`, {
      ...data,
      feEnvio: new Date()
    })
      .then(data => {
        console.log(data)
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" />
        </Helmet>
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify=""
          netlify-recaptcha=""
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Nombre"
                name="nombre"
                required
              />
              <span>Nombre</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Apellido"
                name="apellido"
                required
              />
              <span>Apellido</span>
            </label>
          </div>
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="genero"
                value="masculino"
                defaultChecked
              />
              <span>Masculino</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="genero"
                value="femenino"
              />
              <span>Femenino</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="genero"
                value="otro"
              />
              <span>Otro</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Correo"
              name="correo"
              required
            />
            <span>Correo electrónico</span>
          </label>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="tel"
              placeholder="Número de contacto"
              name="contacto"
              required
            />
            <span>Contacto</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="tipo"
              defaultValue="Tipo de consulta"
              required
            >
              <option disabled hidden>
                Tipo de consulta
              </option>
              <option>Necesito más información</option>
              <option>Solo quería saludar</option>
              <option>Encontré un problema o bug en la página</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Mensaje"
              name="mensaje"
              rows="10"
              required
            />
            <span>Mensaje</span>
          </label>
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="mantenerContacto"
              type="checkbox"
            />
            <span>Manténte en contacto</span>
          </label>
          <div
            className="g-recaptcha"
            data-sitekey="6LcVAt0UAAAAAHVhfscQ-zz7qmHVAZ8KV_1LItII"
          />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Enviar"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default ContactoForm
