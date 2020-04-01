import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { serialize } from 'dom-form-serializer'

import '../Form.css'
import Axios from 'axios'
import { proxyConfig } from '../../helpers/proxyConfig'

class CheckoutForm extends React.Component {
  static defaultProps = {
    name: 'Formulario de registro',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage:
      'Gracias por registrarte en nuestro curso, en breve un asesor se comunicar.',
    errorMessage:
      '¡Ups! No hemos podido recibir tu inscripción, pero no te preocupes, intenta contactarnos por correo electrónico.'
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

    Axios.post(`${proxyConfig.url}/api/reserva/web`, {
      ...data,
      idModulo: this.props.idModulo,
      feEnvio: new Date()
    })
      .then(response => {
        let { data } = response

        if (!data.success) {
          this.setState({
            alert: data.mensaje,
            disabled: false
          })
        } else {
          // NAVEGO
          console.log('Registro guardado!')
          this.props.onReservaSuccess()
        }
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
          <div
            className="g-recaptcha"
            data-sitekey="6LcVAt0UAAAAAHVhfscQ-zz7qmHVAZ8KV_1LItII"
          />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Reservar"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default CheckoutForm
