import React, { useState, useEffect } from 'react';
import YourComponent from './YourComponent';

const ParentComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/search/hitting/108');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* YourComponent를 사용하고 필요한 데이터를 props로 전달 */}
      {data && <YourComponent hittingData={data.hitting} />}
    </div>
  );
};

export default ParentComponent;