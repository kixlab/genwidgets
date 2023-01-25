import React from "react";
import { ProngImage } from "./ProngImage";
import { ProngTextBox } from "./ProngTextBox";
import { Group } from "react-konva";

export const Prong = ({
    y,
    visible,
    text
}) => {
    const imagePxLen = 48;
    const textWidth = 200;
    const textHeight = 100;
    if (text) {
        return (
        <Group>
        <ProngImage 
        x={-imagePxLen-10}
        y={y}
        />
        <ProngTextBox
        x={-imagePxLen-textWidth}
        y={y-textHeight*0.5+12}
        width={textWidth}
        height={textHeight}
        text={text}
        />
        </Group>
        )
    } else {
    return (
        <ProngImage 
        x={-imagePxLen}
        y={y}
        visible={visible} 
        />
    )
    }
};