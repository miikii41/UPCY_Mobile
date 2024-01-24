import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Filter14M } from '../styles/GlobalText';
import { PURPLE } from '../styles/GlobalColor';

interface HashtagParams {
  value: string;
  pressable?: boolean;
}

const Hashtag = ({value, pressable} : HashtagParams) => {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <HashtagContainer pressed={pressed} onPress={() => setPressed(!pressed)} disabled={!pressable}>
      <Filter14M style={{color: pressed ? PURPLE : 'white'}}>{value}</Filter14M>
    </HashtagContainer>
  )
}

const HashtagContainer = styled.TouchableOpacity<{ pressed: boolean }>`
  display: flex;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  margin: 5px;
  background: ${(props: { pressed: boolean }) => props.pressed ? 'white' : PURPLE};
  border-color: ${PURPLE};
  border-width: 1px;
`

export default Hashtag;