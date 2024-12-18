import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Filter from '../../../common/Filter';
import {
  Subtitle18B,
  Subtitle16M,
  Caption11M,
} from '../../../styles/GlobalText';
import { PURPLE } from '../../../styles/GlobalColor';

interface filterElementProps {
  list: string[];
  setStyleFilterOpen: (styleFilterOpen: boolean) => void;
  setPressedStyles: (pressedStyles: string[]) => void;
  setFinalPressedStyles: (finalPressedStyles: string[]) => void;
}

const HomeStyleFilterElement = ({
  list,
  setStyleFilterOpen,
  setPressedStyles,
  setFinalPressedStyles,
}: filterElementProps) => {
  const filterList: string[] = [
    '빈티지',
    '미니멀',
    '캐주얼',
    '페미닌',
    '글램',
    '스트릿',
    '키치',
    '스포티',
    '홈웨어',
    '걸리시',
  ];

  const [pressed, setPressed] = useState<string[]>(list);

  const handlePress = (style: string) => {
    setPressed(prevStyles => {
      let updatedStyles: string[];
      if (prevStyles.includes(style)) {
        updatedStyles = prevStyles.filter(item => item !== style);
      } else {
        updatedStyles = [...prevStyles, style];
      }
      setPressedStyles(updatedStyles);
      return updatedStyles;
    });
  };

  const applyStyles = () => {
    // TODO: 렌더링 관련 고치기
    // setFinalPressedStyles(pressed);
    setStyleFilterOpen(false);
  };

  return (
    // FIXME: fix width style
    <View style={{ width: 380 }}>
      <View
        style={{
          marginTop: 3,
          backgroundColor: '#FFF',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Subtitle16M style={{ color: '#121212' }}>
            스타일
            <Subtitle18B style={{ color: PURPLE }}> *</Subtitle18B>
          </Subtitle16M>
          <Caption11M style={{ color: PURPLE }}>● 중복가능</Caption11M>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 12,
          }}>
          {filterList?.map((value, index) => {
            return (
              <Filter
                key={index}
                value={value}
                pressed={pressed.includes(value)}
                pressable={true}
                onPress={() => {
                  handlePress(value);
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={{ alignItems: 'center', paddingBottom: 10 }}
          onPress={applyStyles}>
          <Text style={{ color: '#000' }}>적용하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeStyleFilterElement;
