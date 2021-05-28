import React , { useState } from 'react'
import {
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone'
import { grey } from '@material-ui/core/colors'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles({
  imgContainer:{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  dropzone: {
    width: props => props.width,
    height: props => props.height,
    background: grey[300],
    borderRadius: 20,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    }
  },
  adminName: {
    color: 'white'
  },
  imageContainerDropzone: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDropzone:{
    width: '100%',
    maxHeight: '100%'
  },
  errorText: {
    color: red[500]
  }
})

const UploadPhoto = ({width,height,file,name,uploadedFile,setUplaodedFile,disabled}) => {
  const classes = useStyles({width , height})
  const [errorFile,setErrorFile] = useState('')

  const { getRootProps , getInputProps } = useDropzone({
    onDropAccepted: files => {
      if(files[0].size > 5242880){
        setErrorFile('La imagen supera los 5 MB')
        setUplaodedFile(null)
        return
      }
      setUplaodedFile(files[0])
      setErrorFile('')
    },
    onDropRejected: (files) => {
      if(files.length > 1){
        setErrorFile('Solo se permite una sola imagen')
      }else{
        setErrorFile('Tipo de archivo inválido')
      }
      setUplaodedFile(null)
    },
    accept: 'image/jpeg, image/png, image/svg+xml, image/gif, image/webp',
    maxFiles: 1,
  })

  const setPhoto = () => {
    if(uploadedFile){
      const fileUrl = URL.createObjectURL(uploadedFile)
      return (
        <div className={classes.imageContainerDropzone}>
          <img className={classes.imageDropzone} src={fileUrl} alt="Profile photo"/>
        </div>
      )
    }else{
      if(file){
        return (
          <div className={classes.imageContainerDropzone}>
            <img className={classes.imageDropzone} src={file} alt="Profile photo"/>
          </div>
        )
      }else{
        return (name  
          ? <Typography variant="h2">{name.toUpperCase()}</Typography>
          : <Typography variant="overline">Subir Imagen</Typography>
        )
      }
    }
  }

  return (
    <>
      <div className={classes.imgContainer}>
        <div {...getRootProps({className: classes.dropzone})}>
          <input {...getInputProps()} disabled={disabled}/>
          {setPhoto()}
        </div>
      </div>
      {errorFile ? <Typography variant="caption" align="center" component="p" classes={{ root: classes.errorText }}>* {errorFile}</Typography> : <></>}
      <Typography variant="caption" align="center" component="p">Archivos admitidos: .jpeg, .png, .svg, .gif, .webp</Typography>
      <Typography variant="caption" align="center" component="p">Tamaño máximo de archivo: 5 MB</Typography>
    </>
  )
}

export default UploadPhoto
