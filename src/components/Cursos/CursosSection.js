import React from 'react'

import './CursosSection.css'
import CursoCard from './CursoCard'

class CursosSection extends React.Component {
  static defaultProps = {
    cursos: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { cursos, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleCursos = cursos.slice(0, limit || cursos.length)

    return (
      <div className="CursosSection">
        {title && <h2 className="CursosSection--Title">{title}</h2>}
        {!!visibleCursos.length && (
          <div className="CursosSection--Grid">
            {visibleCursos.map((curso, index) => (
              <CursoCard key={curso.title + index} {...curso} />
            ))}
          </div>
        )}
        {/* {showLoadMore && visibleCursos.length < cursos.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )} */}
        <div className="taCenter">
          <button className="button" onClick={this.increaseLimit}>
            Ver todos
          </button>
        </div>
      </div>
    )
  }
}

export default CursosSection
