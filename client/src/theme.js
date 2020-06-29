export default {
  padding: function () {
    const args = Array.from(arguments)
    return [...args].map(n => n * 4).join('px ') + 'px'
  },
  borderRadius: '4px',
  colors: {
    white: '#edf2f4',
    primary: '#ef233c',
    secondary: '#d90429',
    dark: '#2b2d42',
    light: '#8d99ae'
  },
  animation: {
    speed: '.15s',
    easeIn: 'ease-in',
    easeOut: 'ease-out'
  }
}
