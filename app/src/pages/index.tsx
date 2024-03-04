import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/styles';
import Spinner from '@/components/loadingSpinner';

const Home: React.FC = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/houses${searchTerm ? `?name=${searchTerm}` : ''}`
        );
        setHouses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const colorExists = (color: string) => {
    const elem = document.createElement('div');
    elem.style.color = color;
    return elem.style.color !== '';
  };

  return (
    <>
    <title>HP Houses</title>
    <div
      style={{
        backgroundColor: 'white',
        padding: '25px',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search house by name"
        style={styles.input}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {houses.map((house: any) => (
            <div
              key={house.id}
              style={{ ...styles.box, marginBottom: '20px' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}
              >
                <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '5px' }}>
                  {house.name}
                </h2>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                  {house.animal}
                </p>
              </div>
              <div
                style={{
                  height: '20px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  background:
                    colorExists(house.houseColours.split(' and ')[0]) &&
                    colorExists(house.houseColours.split(' and ')[1])
                      ? `linear-gradient(to right, ${house.houseColours.split(
                          ' and '
                        )[0]}, ${house.houseColours.split(' and ')[1]})`
                      : 'linear-gradient(to right, white, black)',
                }}
              ></div>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <span>Founder:</span>{' '}
                <span style={{ fontWeight: 'bold' }}>{house.founder}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Home;
