import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { style } from './style';

type Props = TouchableOpacityProps & {
    title: String
}


export function Button({ title, ...rest }: Props) {
    return (
        <TouchableOpacity style={style.container} {...rest}>
            <Text style={style.title} >{title}</Text>
        </TouchableOpacity>
    )
}