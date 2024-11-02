"use client";

import { fetchSettings } from '@/store/gsSlice';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function SetGeneralSetting() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return null;
}
