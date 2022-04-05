import React from 'react';
import { 
  StyleSheet, 
  View, 
} from 'react-native';

const BarProgress: React.FC = () => {
  const week = new Date().getDay();
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const porcentagem = 100 / 9;
  const dateFinal = new Date(`${months[month]}  ${day}, ${year} 18:00:00`).getTime();

  const now = new Date().getTime();
  const distance = dateFinal - now;
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)+1);

  return (
    <>
      {week >= 6 || week == 0 ? (
        <>
          <View style={styles.bar}><View style={[styles.bar, styles.barTwo, {height:0}]} /></View>
        </>
      ) : (
        <>
          {hours > 9 ? (
            <>
              <View style={styles.bar}><View style={[styles.bar, styles.barTwo, {height:0}]} /></View>
            </>
          ) : (
            <>
              <View style={styles.bar}><View style={[styles.bar, styles.barTwo, {height:porcentagem * hours +'%'}]} /></View>
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    width: 4,
    backgroundColor: '#1b1b1e',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barTwo: {
    width: 4,
    backgroundColor: '#5afa9a',
    borderRadius: 4,
    position: 'absolute'
  },
});

export default BarProgress;