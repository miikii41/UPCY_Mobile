import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import Arrow from '../../../assets/common/Arrow.svg';
import { BLACK, PURPLE } from '../../../styles/GlobalColor';
import { Subtitle16B, Title20B, Body14R, Subtitle16M } from '../../../styles/GlobalText';
import Request from '../../../common/requests.js';
import { getAccessToken } from '../../../common/storage.js';

const { width } = Dimensions.get('window');

export interface QuotationReview {
  navigation: any;
  route: any;
}

const QuotationReview = ({ navigation }: QuotationReview) => {
  const [orderList, setOrderList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessToken();
        const request = Request();

        const response = await request.get('/api/orders', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 200) {
          setOrderList(response.data);
        }
      } catch (error) {
        console.error('주문 이력 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView>
      <BackButton onPress={() => navigation.goBack()}>
        <Arrow color={BLACK} />
      </BackButton>

      <Title20B style={{ marginTop: 20, textAlign: 'center' }}>주문 이력</Title20B>

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>불러오는 중...</Text>
      ) : (
        orderList.map((order, index) => (
          <OrderCard key={index} onPress={() => navigation.navigate('QuotationPage', order)}>
            <View>
              <Subtitle16B>{order.order_date}</Subtitle16B>
              <Body14R>총 결제 금액: {order.total_price.toLocaleString()}원</Body14R>
            </View>
            {order.images.length > 0 && (
              <Image source={{ uri: order.images[0].image }} style={styles.orderImage} />
            )}
          </OrderCard>
        ))
      )}
    </ScrollView>
  );
};

const BackButton = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  left: 0px;
  top: 10px;
  z-index: 1;
`;

const OrderCard = styled.TouchableOpacity`
  background-color: white;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
`;

const styles = StyleSheet.create({
  orderImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
});

export default QuotationReview;
