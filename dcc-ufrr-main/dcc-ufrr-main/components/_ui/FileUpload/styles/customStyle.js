const customStyle = {
  inputStyle: {
    display: 'block',
    height: '100%',
    width: '100%',
    border: 'none',
    textTransform: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0,
    _focus: {
      outline: 'none'
    }
  },
  dragStyle: {
    position: 'relative',
    py: 35,
    px: 20,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'lightgray',
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2
  }
}

export default customStyle
