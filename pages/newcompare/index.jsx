import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    id: "1",
    title: "Gunnar Henderson",
    subtitle: "여기에 Gunnar Henderson의 정보",
    img: "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current",
  },
  {
    id: "2",
    title: "이름1",
    subtitle: "정보 입력 란",
    img: "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current",
  },
  { 
    id: "3",
    title: "이름2",
    subtitle: "정보 입력 란",
    img: "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/683002/headshot/67/current",
  },
];

const Accordion = () => {
  return (
    <Container>
      <motion.ul
        layout
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </motion.ul>
    </Container>
  );
};

const Item = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <ItemWrap
        onClick={toggleOpen}
        layout
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <motion.h1>{item.title}</motion.h1>
        <Img>
          <motion.img
            src={item.img}
            alt={item.title}
            layout
            transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          />
        </Img>
      </ItemWrap>
      <AnimatePresence>
        {isOpen && (
          <SubWrap>
            <motion.h5
              layout
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {item.subtitle}
            </motion.h5>
          </SubWrap>
        )}
      </AnimatePresence>
    </>
  );
};

//선수 목록 뜨는 칸
const Container = styled(motion.div)`
  margin: 200px auto 0 auto;
  width: 50%;
  text-align: center;

  ul {
    height: 120%;
    width: 120%;
    background: #fff;
    margin: 0 auto;
  }
`;

const ItemWrap = styled(motion.li)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: -1px;
  background: white;
  overflow: hidden;

  h1 {
    padding: 5% 5% 5% 5%;
    font-size: 150%;
    z-index: 1;
    opacity: 0.9;
  }
`;
//선수 얼굴 사진
const Img = styled(motion.div)`
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 30px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border:1px solid #000000;

  img {
    width: 130%;
    height: 130%;
    border-radius: 50%;
    vertical-align: bottom;
    object-fit: cover;
  }
`;

const SubWrap = styled(motion.div)`
  font-size: 15px;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;

  h5 {
    padding: 20px 30px;
    font-size: 100%; 
    font-weight: 500;
    line-height: 500%;
    text-align: left;
  }

  :last-child {
    border-radius: 0 0 20px 20px;
  }
`;

export default Accordion;
