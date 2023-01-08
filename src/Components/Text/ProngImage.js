import React from "react";
import useImage from 'use-image';
import { Image } from "react-konva";

export const ProngImage = ({ ...rest }) => {
    const prongURL = "https://user-images.githubusercontent.com/67339217/210928088-442ca3f8-9e6b-4918-93e3-f06932771d29.svg";
    const imagePxLen = 48;
    const [image] = useImage(prongURL);
    return <Image image={image} x={-imagePxLen} {...rest} />;
  };