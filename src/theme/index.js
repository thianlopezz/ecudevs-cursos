const palette = {
  primary: {
    main: '#00a89a',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#ff5a5f',
    contrastText: '#ffffff'
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff'
  },
  gray: {
    gray100: '#FAFAFA',
    gray200: '#F5F5F5',
    gray300: '#ECECEC'
  },
  dark: {
    dark: '#353535',
    gray: '#919094',
    metalblue: '#3E4A63'
  },

  white: {
    white0: '#ffffff',
    white100: '#FAFAFA',
    white200: '#F5F5F5',
    white300: '#ECECEC'
  }
}

export const status = {
  danger: '#FA3E3E',
  warning: '#F0AD4E',
  success: '#5cb85c'
}

export const CSS_HELPERS_REACT = {
  CENTER: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  CENTER_VERTICAL: {
    display: 'flex',
    alignItems: 'center'
  },
  TRUNCATE: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  BOX_SHADOW: {
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px !important'
  }
}

export const CSS_HELPERS = {
  CENTER: `
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction:row;
    `,
  CENTER_HORIZONTAL: `
        display:flex;
        justify-content: center;
    `,
  ROUNDED: `border-radius:12pt`,
  BOX_SHADOW: `
    -webkit-box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.123);
    -moz-box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.123);
    box-shadow: 0px 8px 6px -6px rgba(0,0,0,0.123);
  `
}

export const CSS_FONTS = {
  SIZES: {
    MENU: '.9em',
    H1: '2.5rem',
    H2: '2rem',
    H3: '1.75rem',
    H4: '1.5rem',
    H5: '1.25rem',
    H6: '1rem',
    MD: '1.5rem',
    SM: '1rem'
  },
  FONTS_URL: {
    BODY: 'https://fonts.googleapis.com/css?family=Poppins&display=swap',
    MENU: 'https://fonts.googleapis.com/css?family=Raleway&display=swap'
  },
  FONTS: {
    BODY: "'Poppins', sans-serif",
    MENU: "'Raleway', sans-serif;"
  }
}

const MEDIA_SCREENS = {
  SMALL: {
    FROM: '0',
    TO: '768'
  },
  MEDIUM: {
    FROM: '768',
    TO: '4000'
  }
}

export { palette, MEDIA_SCREENS }
