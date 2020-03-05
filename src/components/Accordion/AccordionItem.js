import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './AccordionItem.css'

export default class AccordionItem extends React.Component {
  static defaultProps = {
    title: '',
    className: ''
  }

  state = { visible: false }

  constructor(props) {
    super(props)
  }

  handleClick = event => {
    event.target.classList.toggle('active')
  }

  render() {
    const { title, children, className } = this.props

    return (
      <div className={`ItemAccordion ${className}`}>
        <div className={`ItemAccordion--item`} onClick={this.handleClick}>
          <h2 className="flex">
            <span>{title}</span>
            <ChevronDown />
          </h2>
          <div className={'description'}>{children}</div>
        </div>
      </div>
    )
  }
}
