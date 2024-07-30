import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper,Typography } from '@material-ui/core'
import {
  Add as AddIcon,
  DeleteForever,
  PictureInPicture as PictureInPictureIcon,
} from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import {
  setStoredPaths,
  setStoredOptions,
  getStoredPaths,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage'


type AppProps = {
  path: string;
  onDelete: Function,
  onSetHomePath: Function
  optionsProps: any
};

const PromptDetailCard =({ path,onDelete,onSetHomePath,optionsProps }: AppProps)=>{
const [options,setOptions] = useState<LocalStorageOptions | null>(optionsProps)
  useEffect(() => {
    setOptions(optionsProps)
  }, [optionsProps])
  const isHome =options && options.homePath && options.homePath === path;
  console.log("isHome",isHome)
  return  (  <Box mx="8px" my="16px"><Paper><Grid container justify="space-evenly">
  <Grid item xs={10}>
        <div style={{marginTop:'10px',marginLeft:'5px',width:'100%',overflow:'auto'}}>
       <Typography>{path}</Typography>
       </div>

  </Grid>
  <Grid item xs={2}>
        <IconButton onClick={()=>{onDelete()}}>
          <DeleteForever />
        </IconButton>
  </Grid>
</Grid></Paper></Box>)
}

const App: React.FC<{}> = () => {
  const [paths, setPaths] = useState<string[]>([])
  const [pathInput, setPathInput] = useState<string>('')
  const [options, setOptions] = useState<any>({homePath:null})

  useEffect(() => {
    getStoredPaths().then((paths) => setPaths(paths))
    getStoredOptions().then((options) =>{
      setOptions(options)
    } )
  }, [])



  const onPromptSubmit = () => {
    if (pathInput === '') {
      return
    }
    const updatedPaths = [...paths, pathInput]
    setStoredPaths(updatedPaths).then(() => {
      setPaths(updatedPaths)
      setPathInput('')
      updatedPaths.length ===1 && handleSetHomePath(pathInput)
      handleOverlayButtonClick()
    })
  }

  const handlePathDeleteButtonClick = (index: number) => {
    let deletedArray = paths.splice(index, 1)
    if(deletedArray[0] === options.homePath){
      handleSetHomePath(paths[0])
    }
    const updatedPaths = [...paths]
    setStoredPaths(updatedPaths).then(() => {
      setPaths(updatedPaths)
      handleOverlayButtonClick()
    })
   
  }

  const handleSetHomePath = (value) => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      homePath: value,
    }
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }


  const handleOverlayButtonClick = () => {
    chrome.runtime.sendMessage(null,()=>{})
  }
  const AddYourPromptCard = () =>{
    return (<Grid item xs={12}>
      <Paper>
        <div style={{display:'flex'}}>
          <div style={{flex: 11,justifyItems:'center',alignItems:'center',marginTop:'8px',marginLeft:'5px'}}><InputBase
            placeholder="Add your prompt"
            fullWidth
            value={pathInput}
            onChange={(event) => setPathInput(event.target.value)}
            onKeyPress={(eve)=>{
              if(eve.key==='Enter'){
                onPromptSubmit()
              }
            }}
          />
          </div>
          <div style={{flex: 1}}>
          <IconButton onClick={onPromptSubmit}>
            <AddIcon />
          </IconButton>
          </div>
          </div>
      </Paper>
    </Grid>)
  }

  return (
<div>
      <Grid container justify="space-evenly">
        <Grid item xs={12}>
          <Paper>
            <div style={{display:'flex'}}>
              <div style={{flex: 11,justifyItems:'center',alignItems:'center',marginTop:'8px',marginLeft:'5px'}}><InputBase
                placeholder="Add your prompt"
                fullWidth
                value={pathInput}
                onChange={(event) => setPathInput(event.target.value)}
                onKeyPress={(eve)=>{
                  if(eve.key==='Enter'){
                    onPromptSubmit()
                  }
                }}
              />
              </div>
              <div style={{flex: 1}}>
              <IconButton onClick={onPromptSubmit}>
                <AddIcon />
              </IconButton>
              </div>
              </div>
          </Paper>
        </Grid>
      </Grid>
      {
        paths.map((path,i) => <PromptDetailCard key={path+i} optionsProps={options} path={path} onDelete={()=>{handlePathDeleteButtonClick(i)}} onSetHomePath={()=>handleSetHomePath(path)}/>
        )
      }
      </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
