import { Button } from '@mui/material'
import React from 'react'
import { getSpotifyAuthURL } from '../../utils/auth'

const login = () => {
  getSpotifyAuthURL()
}

const LoginButton = () => {
  return (
    <Button variant='contained' color='secondary' size='large' onClick={login}>
        Log in
    </Button>
  )
}

export default LoginButton
