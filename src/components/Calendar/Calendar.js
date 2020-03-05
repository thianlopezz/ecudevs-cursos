import React from 'react'
import clsx from 'clsx'
import { DatePicker } from '@material-ui/pickers'
import { withStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/moment'
import moment from 'moment'
import styled from 'styled-components'
import { palette, MEDIA_SCREENS } from '../../theme'

let Calendar = ({
  classes,
  value,
  datesChecked = [],
  onChange,
  format,
  emptyLabel,
  onClose,
  ...props
}) => {
  let dates = datesChecked

  function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
    const Day = () =>
      React.cloneElement(dayComponent, {
        onClick: e => {
          e.stopPropagation()
          const i = dates.findIndex(d => moment(day).isSame(d, 'day'))
          if (i >= 0) {
            const nextDates = [...dates]
            nextDates.splice(i, 1)
            // setDates(nextDates);
          } else {
            // setDates([...dates, day]);
          }

          onChange && onChange(moment(day))
        },
        selected: !!dates.find(d => moment(day).isSame(d, 'day')),
        className: clsx(classes.day, {
          [classes.hidden]: dayComponent.props.hidden,
          [classes.current]: dayComponent.props.current,
          [classes.isTrip]: (() => {
            if (dates && dates.length > 0) {
              return dates.find(date => moment(date).isSame(day, 'day'))
            } else return false
          })(),
          [classes.isSelected]: moment(day).isSame(moment(value), 'day')
        })
      })

    if (moment(day).isSame(value, 'day')) {
      return (
        <SelectedDay>
          <Day />
        </SelectedDay>
      )
    }

    return (
      <div>
        <Day />
      </div>
    )
  }
  //   const formatDate = date => utils.format(date, format || utils.dateFormat);
  const formatDate = 'DD-MM-YYYY'

  return (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          {...props}
          variant="static"
          autoOk
          orientation="landscape"
          disableToolbar
          value={value}
          renderDay={renderDay}
        />
      </MuiPickersUtilsProvider>
    </Wrapper>
  )
}

export const styles = theme => {
  // const base = makeStyles(theme);
  // const base = useTheme();
  return {
    // ...base,
    isDisabled: {
      textDecoration: 'line-through',
      opacity: 0.7,
      '&:hover': {
        cursor: 'unset',
        background: 'rgba(0,0,0,0)'
      }
    },
    isTrip: {
      backgroundColor: '#009ada21',
      color: palette.primary.main,
      fontWeight: 'bold'
    },
    isSelected: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText
    },
    day: {
      // ...base.day,
      // color: '#ffffff',
      fontWeight: 500,
      // backgroundColor: '#343a40ed',
      // margin: 0,
      // width: '2.5rem',
      // height: '2.5rem',
      borderRadius: '5%'
    }
  }
}

export default withStyles(styles, { name: 'Calendar' })(Calendar)

// trabajar responsive
const Wrapper = styled.div`
  // @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM + 'px'}) {
  //   height: 100vh;
  //   overflow-y: scroll;
  // }
  
  //zoom: 2;
  .MuiPickersStaticWrapper-staticWrapperRoot {
    min-width: unset;
  }
  .MuiPickersBasePicker-pickerView {
    min-width: unset;
  }
  .MuiPickersCalendar-week {
    display: flex;
    justify-content: space-around;
  }
  .MuiIconButton-label svg {
    transform: unset!important;
  }
`

const SelectedDay = styled.div`
  .MuiPickersDay-daySelected {
    color: #ffffff;
    font-weight: 500;
    background-color: #343a40ed;
  }
`
