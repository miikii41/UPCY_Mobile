import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { Body14R, Body16B } from '../../../styles/GlobalText';
import { MarketResponseType } from './MarketTabView';

// 개별 마켓 페이지 누르면 보이는 '프로필' 탭에 있는 페이지임!
type InfoPageDataType = {
  label: string;
  data: string;
};
const InfoPage = ({ marketData }: { marketData: MarketResponseType }) => {
  // const data = [
  //   {
  //     label: '소개글',
  //     data: '안녕하세요 데님 전문 리폼러 하느리퐁퐁입니다!\n 어쩌구 저쩌구',
  //   },
  //   { label: '오픈채팅 링크', data: 'https://www.naver.com' },
  //   { label: '주요 활동지역', data: '서울 서대문구' },
  //   {
  //     label: '경력',
  //     data: [
  //       '업씨대학교 패션디자인학과 졸업',
  //       '한국패션디자인공모전 동상',
  //       '업씨패션회사 인턴 6개월',
  //     ],
  //   },
  // ];

  const [data, setData] = useState<InfoPageDataType[]>();

  useEffect(() => {
    const newData = [
      {
        label: '소개글',
        data: marketData.market_introduce,
      },
      { label: '오픈채팅 링크', data: marketData.market_address },
    ];
    setData(newData);
  }, [marketData]);

  return (
    <Tabs.FlatList
      data={data}
      style={{ marginTop: 12 }}
      renderItem={({ item }: any) => {
        return (
          <InfoSection>
            <Body16B>{item.label}</Body16B>
            {item.label === '경력' ? (
              // item.data가 list인 경우
              <View style={styles.flexColumn}>
                {item.data.map((itemData: string, index: number) => (
                  <Body14R key={index}>{itemData}</Body14R>
                ))}
              </View>
            ) : item.label == '오픈채팅 링크' ? (
              <Body14R
                style={{ textAlign: 'right', textDecorationLine: 'underline' }}>
                {item.data}
              </Body14R>
            ) : (
              <Body14R style={{ textAlign: 'right' }}>{item.data}</Body14R>
            )}
          </InfoSection>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

const InfoSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #dfdfdf;
`;

export default InfoPage;
