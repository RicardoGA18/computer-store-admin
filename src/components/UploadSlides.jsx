import React , { useState , useEffect } from 'react'
import {
  Typography,
  MobileStepper,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone'
import { grey } from '@material-ui/core/colors'
import { red } from '@material-ui/core/colors'
import { Delete } from '@material-ui/icons'
import { validateYupSchema } from 'formik';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    height: 45,
    paddingLeft: 20,
  },
  slide: {
    display: 'block',
    width: '100%',
  },
  slideContainer:{
    width: '100%',
    position: 'relative'
  },
  deleteSlideButton: {
    position: 'absolute',
    top: -55,
    right: 10,
  },
  iconButton: {
    background: 'rgba(0,0,0,.3)'
  },
  errorText: {
    color: red[500]
  },
  dropzone: {
    position: 'relative',
    cursor: 'pointer',
    transition: '.3s all',
    '&::before': {
      content: '"Arrastra y suelta una imagen aquí"',
      transition: '.3s all',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      textAlign: 'center',
      opacity: 0,
      top: 0,
      zIndex: 10,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,.8)',
      color: 'white',
    },
    '&:hover::before': {
      opacity: 1,
    },
  },
  noPhotoContainer: {
    width: '100%',
    paddingBottom: 'calc( 100% * ( 4/7 ))',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    background: grey[300],
  },
  noPhotoContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const UploadSlides = ({disabled,slides,uploadedSlides,setUploadedSlides,imagesToDelete,setImagesToDelete}) => {
  const classes = useStyles()
  const [errorSlides,setErrorSlides] = useState('')
  const [step,setStep] = useState(0)
  
  const { getRootProps , getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/svg+xml, image/gif, image/webp',
    onDropAccepted: files => {
      for(let file of files){
        if(file.size > 5242880){
          setErrorSlides('Ninguna imágen debe superar los 5 MB')
          setUploadedSlides([])
          return
        }
      }
      setUploadedSlides(files)
      setErrorSlides('')
    },
    onDropRejected: files => {
      setErrorSlides('Tipo de archivo inválido')
      setUploadedSlides([])
    }
  })

  const handleDeleteButton = (url,e) => {
    e.preventDefault()
    e.stopPropagation()
    const newSlidesToDelete = [...imagesToDelete , url]
    setImagesToDelete(newSlidesToDelete)
  }

  const setPhotos = (activeStep) => {
    let newSlides = JSON.parse(JSON.stringify(slides))
    imagesToDelete.forEach(imageToDelete => {
      newSlides = newSlides.filter(sl => sl !== imageToDelete)
    })
    if(newSlides && newSlides.length && newSlides[activeStep]){
      return (
        <div className={classes.slideContainer}>
          <img src={newSlides[activeStep]} className={classes.slide} />
          <div className={classes.deleteSlideButton}>
            <IconButton onClick={(e)=>{handleDeleteButton(newSlides[activeStep],e)}}>
              <Delete fontSize="default" style={{ color: red[700] }}/>
            </IconButton>
          </div>
        </div>
      )
    }else{
      return <></>
    }
  }

  const setUploadedPhotos = (activeStep) => {
    if(uploadedSlides && uploadedSlides.length){
      const formatStep = activeStep - slides.length + imagesToDelete.length
      if(uploadedSlides[formatStep]){
        const fileUrl = URL.createObjectURL(uploadedSlides[formatStep])
        return (
          <div className={classes.slideContainer}>
            <img src={fileUrl} className={classes.slide}/>
          </div>
        )
      }else{
        return <></>
      }
    }else{
      return <></>
    }
  }

  const handleNext = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handleBack = () => {
    setStep(prevStep => prevStep -1)
  }

  const setNoPhoto = (activeStep) => {
    if(slides && slides.length){
      if(activeStep === 0 && slides.length - imagesToDelete.length + uploadedSlides.length === 0){
        return (
          <div className={classes.noPhotoContainer}>
            <div className={classes.noPhotoContent}>
              <Typography variant="overline" align="center">Arrastra y suelta una imagen aquí</Typography>
            </div>
          </div>
        )
      }else{
        return <></>
      }
    }else{
      if(!uploadedSlides.length){
        return (
          <div className={classes.noPhotoContainer}>
            <div className={classes.noPhotoContent}>
              <Typography variant="overline" align="center">Arrastra y suelta una imagen aquí</Typography>
            </div>
          </div>
        )
      }
      return <></>
    }
  }

  useEffect(() => {
    if(slides && slides.length){
      if(step < 0){
        setStep(0)
      }else if(slides.length - imagesToDelete.length + uploadedSlides.length === 0){
        setStep(0)
      }else if(step > slides.length - imagesToDelete.length + uploadedSlides.length - 1){
        setStep(slides.length - imagesToDelete.length + uploadedSlides.length - 1)
      }
    }
  }, [imagesToDelete])

  return (
    <div>
      <Paper square elevation={0} classes={{ root: classes.header }}>
        <Typography variant="h6">Slides</Typography>
      </Paper>
      <div {...getRootProps({className: classes.dropzone})}>
        <input {...getInputProps()} disabled={disabled} />
        {setPhotos(step)}
        {setUploadedPhotos(step)}
        {setNoPhoto(step)}
      </div>
      {errorSlides ? <Typography variant="caption" align="center" component="p" classes={{ root: classes.errorText }}>* {errorSlides}</Typography> : <></>}
      <MobileStepper 
        steps={slides && slides.length - imagesToDelete.length + uploadedSlides.length ? slides.length - imagesToDelete.length + uploadedSlides.length : 1}
        position="static"
        variant="text"
        activeStep={step}
        nextButton={
          <Button size='small' onClick={handleNext} disabled={slides ?  step >= slides.length - imagesToDelete.length + uploadedSlides.length - 1 : true}>
            Siguiente
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={step <= 0}>
            <KeyboardArrowLeft />
            Anterior
          </Button>
        }
      />
    </div>
  )
}

export default UploadSlides
