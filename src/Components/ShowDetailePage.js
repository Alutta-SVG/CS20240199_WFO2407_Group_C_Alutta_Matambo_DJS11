import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ShowDetailsPage = () => {
    const { id } = useParams();
    const [show, setShow] = useState({});