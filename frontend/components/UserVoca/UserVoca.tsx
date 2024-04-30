import styled from "styled-components";
import { MouseEvent, Fragment, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userVocasActions } from "@redux/userVocas/userVocasSlice";
import { vocasActions } from "@redux/vocas/vocasSlice";
import { IState } from "@redux/initialState";
import LevelCard from "./LevelCard";
import VocaTable from "./VocaTable";
import { FolderSvg, FolderOpenSvg, XMarkSvg, FrownSvg } from "@svg";
import { userVocaColors } from "@color/userVocaColor";
import chunk from "@utils/chunk";
import formatter from "@utils/camelCaser";
import { IUserVocaData, IClickedVoca } from "@type/userVoca";
import { TitlesType, TITLES, TitleItems } from "@type/commons/title";

const ArrowVariants: Variants = {
  open: {
    opacity: 1,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    transition: { delay: 0.2, duration: 1 },
  },
  closed: {
    opacity: 0,
    clipPath: "polygon(50% 100%, 0% 100%, 100% 100%)",
    transition: { delay: 0.05, duration: 0.1 },
  },
};

const BoardVariants: Variants = {
  smallOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "120px",
    marginBottom: "20px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  normalOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "240px",
    marginBottom: "20px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  bigOpen: {
    clipPath: "inset(0% 0% 0% 0%)",
    height: "360px",
    marginBottom: "20px",
    transition: {
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    height: "0px",
    transition: {
      bounce: 0,
      duration: 0.3,
    },
  },
};

interface Props {
  data: { web: TitleItems };
}

export default function UserVoca({ data }: Props) {
  const [clickId, setClickId] = useState<string | null>(null);
  const [clickedRow, setClickedRow] = useState<string | null>(null);
  const [rowData, setRowData] = useState<TitleItems[]>([]);
  const [userVocaData, setUserVocaData] = useState<IUserVocaData>({});
  const [clickedVoca, setClickedVoca] = useState<IClickedVoca>({});

  //유저 정보 없으면 로그인 페이지
  const {
    loading,
    data: userData,
    error,
  } = useSelector(({ user }: IState) => user);

  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    if (!loading && error) router.push("/signIn");
  }, [loading, error, router]);

  useEffect(() => {
    dispatch(userVocasActions.getUserVocas());
  }, [userData, dispatch]);

  //유저가 저장한 보카 목록 불러오기, 항상 다시 불러옴
  const userVocas = useSelector(({ userVocas }: IState) => userVocas);

  //전체 보카 데이터 없으면 api 콜
  const vocas = useSelector(({ vocas }: IState) => vocas);

  useEffect(() => {
    if (!vocas.data) dispatch(vocasActions.getVocas());
  }, [vocas, dispatch]);

  useEffect(() => {
    if (data) setRowData(chunk(data.web as [], 4));
  }, [data]);

  useEffect(() => {
    if (vocas.data && userVocas.data) {
      let userSavedData: IUserVocaData = {};
      for (let title of TITLES) {
        let savedData = userVocas.data[title];

        if (savedData) {
          const tmp = JSON.parse(savedData);
          userSavedData[title] = { data: tmp, len: tmp.length };
        } else {
          userSavedData[title] = { data: [], len: 0 };
        }
      }

      setUserVocaData(userSavedData);
    }
  }, [vocas.data, userVocas.data]);

  const handleClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    const [tag, row] = e.currentTarget.id.split("|");
    setClickId(formatter(tag));
    setClickedRow(row);
  };

  const handleClickClose = () => {
    setClickId(null);
    setClickedRow(null);
  };

  const handleClickCard = (e: MouseEvent<HTMLElement>) => {
    const [category, level] = e.currentTarget.id.split("|");
    let copy = clickedVoca[category as TitlesType] || [];
    if (copy.includes(level)) {
      copy = copy.filter((item) => level !== item);
    } else {
      copy.push(level);
    }
    setClickedVoca((prev) => ({ ...prev, [category]: copy }));
  };

  return (
    <Wrapper>
      <header>
        <h1>Saved Vocabulary</h1>
      </header>
      <VocaCardWrapper>
        {rowData.map((data, rowIdx) => (
          <Row key={rowIdx} initial={false}>
            {data.map((item) => (
              <Fragment key={item.title}>
                {clickId !== null ? (
                  <VocaCard
                    initial={false}
                    id={item.title + "|" + rowIdx}
                    onClick={handleClickClose}
                    style={
                      clickId === formatter(item.title)
                        ? {
                            backgroundColor: "#00b894",
                            opacity: 1,
                          }
                        : {
                            backgroundColor: "#949fb0",
                            opacity: 0.5,
                            pointerEvents: "none",
                          }
                    }
                    whileHover={
                      clickId === formatter(item.title)
                        ? { cursor: "pointer" }
                        : { cursor: "none" }
                    }
                  >
                    {!item.ok && (
                      <Overray>
                        <div>
                          <p>Not Yet</p>
                        </div>
                      </Overray>
                    )}
                    <Col>
                      <h2>
                        {item.title}
                        {userVocaData &&
                          ` (
                              ${userVocaData?.[formatter(item.title)]?.len}
                              )`}
                      </h2>
                      <SvgBox>
                        {clickId === formatter(item.title) ? (
                          <FolderOpenSvg />
                        ) : (
                          <FolderSvg />
                        )}
                      </SvgBox>
                    </Col>
                    <Arrow
                      initial={false}
                      variants={ArrowVariants}
                      animate={
                        clickId === formatter(item.title) ? "open" : "closed"
                      }
                    />
                  </VocaCard>
                ) : (
                  <VocaCard
                    initial={false}
                    whileHover={
                      item.ok
                        ? {
                            scale: 1.05,
                            transition: { duration: 0.2 },
                            cursor: "pointer",
                          }
                        : {}
                    }
                    style={{ pointerEvents: item.ok ? "auto" : "none" }}
                    id={item.title + "|" + rowIdx}
                    onClick={handleClickOpen}
                  >
                    {!item.ok && (
                      <Overray>
                        <div>
                          <p>Not Yet</p>
                        </div>
                      </Overray>
                    )}
                    <Col>
                      <h2>
                        {item.title}
                        {userVocaData &&
                          ` (
                              ${userVocaData?.[formatter(item.title)]?.len || 0}
                              )`}
                      </h2>
                      <SvgBox>
                        {clickId === item.title ? (
                          <FolderOpenSvg />
                        ) : (
                          <FolderSvg />
                        )}
                      </SvgBox>
                    </Col>
                    <Arrow
                      initial={false}
                      variants={ArrowVariants}
                      animate={clickId === item.title ? "open" : "closed"}
                    />
                  </VocaCard>
                )}
              </Fragment>
            ))}
            <CardDetail
              key={rowIdx}
              initial={false}
              variants={BoardVariants}
              animate={
                clickedRow === rowIdx + ""
                  ? (userVocaData?.[clickId as string]?.len as number) <= 4
                    ? "smallOpen"
                    : (userVocaData?.[clickId as string]?.len as number) <= 8
                    ? "normalOpen"
                    : "bigOpen"
                  : "closed"
              }
            >
              <XBtnBox onClick={handleClickClose}>
                <XMarkSvg width="18" height="18" color="white" />
              </XBtnBox>
              <DetailBox>
                {userVocas.data && vocas.data && clickId && (
                  <>
                    {userVocas.data[clickId] ? (
                      JSON.parse(userVocas?.data[clickId]).map(
                        (level: string) => (
                          <LevelCard
                            isClick={
                              clickedVoca?.[clickId as TitlesType]?.includes(
                                "" + level
                              ) || false
                            }
                            key={level}
                            amount={
                              vocas.data?.category[clickId].level[level]
                                .length || 0
                            }
                            onClickCard={handleClickCard}
                            level={level}
                            category={clickId}
                          />
                        )
                      )
                    ) : (
                      <div style={{ gridColumn: "5/1" }}>
                        <Col>
                          <FrownSvg width="80" height="80" color="white" />
                          <span>Empty</span>
                        </Col>
                      </div>
                    )}
                  </>
                )}
              </DetailBox>
            </CardDetail>
          </Row>
        ))}
      </VocaCardWrapper>
      {clickedVoca && vocas.data && (
        <VocaTable clickedVoca={clickedVoca} vocas={vocas.data} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  h1 {
    margin-bottom: 20px;
    font-size: ${(props) => props.theme.fontSize.lg};
    color: ${(props) => props.theme.colorTheme.textPrimary};
  }
`;

const VocaCardWrapper = styled.section`
  max-width: ${(props) => props.theme.windowSize.tablet};
  width: 100%;
  padding: 30px;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 50px;
`;

const VocaCard = styled(motion.article)`
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${userVocaColors.userVoca.vocaCardBgColor};
  font-weight: ${(props) => props.theme.fontWeight.base};
  div {
    pointer-events: none;
  }
`;

const SvgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 14px;
`;

const Overray = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    padding: 15px 10px;
    background-color: ${userVocaColors.userVoca.overlayColor};
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    font-weight: ${(props) => props.theme.fontWeight.xbold};
  }
`;

const CardDetail = styled(motion.ul)`
  grid-column: 5/1;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${userVocaColors.userVoca.levelCardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailBox = styled.div`
  padding: 24px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
`;

const XBtnBox = styled.div<React.HTMLAttributes<HTMLElement>>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  right: 5px;
  top: 5px;
  transition: all ease 2s;
  :hover {
    cursor: pointer;
    transform: rotate(180deg);
  }
`;

const Arrow = styled(motion.div)`
  position: absolute;
  width: 0;
  height: 0;
  top: 105px;
  border-bottom: 18px solid ${userVocaColors.userVoca.levelCardBgColor};
  border-right: 18px solid transparent;
  border-left: 18px solid transparent;
  :hover {
    transition: none;
  }
`;

const Row = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  :last-child {
    margin-bottom: -20px;
  }
`;
