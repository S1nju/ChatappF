import React from 'react'
import Cookie from 'cookie-universal'
import {  Outlet } from 'react-router-dom';

export default function Logincallback() {
  const cookie = Cookie();

  return  cookie.get('token')? window.history.back():<Outlet></Outlet>
}
