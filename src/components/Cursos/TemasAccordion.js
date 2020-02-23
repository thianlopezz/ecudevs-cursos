import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './TemasAccordion.css'

export default class TemasTemasAccordion extends React.Component {
  static defaultProps = {
    temas: [],
    className: ''
  }

  // use state to auto close but has issues mobile view. onClick={() => this.handleClick(index)}
  // state = {
  //   activeItem: null
  // }
  //
  // handleClick = index => {
  //   this.setState({
  //     activeItem: this.state.activeItem === index ? null : index
  //   })
  // }

  handleClick = event => event.target.classList.toggle('active')

  render() {
    const { temas, className } = this.props
    return (
      <div className={`TemasAccordion ${className}`}>
        {!!temas &&
          temas.map((item, index) => (
            <div
              className={`TemasAccordion--item `}
              key={`TemasAccordion-item-${_kebabCase(item.tema) + '-' + index}`}
              onClick={this.handleClick}
            >
              <h2 className="flex">
                <span>{item.tema}</span>
                <ChevronDown />
              </h2>
              <div className={'description'}>
                <ul>
                  {item.subtemas.map(subtema => (
                    <li key={subtema.subtema}>{subtema.subtema}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    )
  }
}
