import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import DateCarousel from "./DateCarousel";
import MatchCard from "./MatchCard";

const API_BASE_URL = "http://localhost:3000/api/matches";

const MatchListPage = () => {
  const [matches, setMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);

        const localDate = new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000);
        const formattedDate = localDate.toISOString().split("T")[0];

        const res = await axios.get(`${API_BASE_URL}/date/${formattedDate}`);

        setMatches(res.data.data);
      } catch (err) {
        console.error("경기 목록 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedDate]);

  return (
    <>
      <div className="info-board">
        <h2 className="mb-4">경기 목록</h2>
        <Image
          src="/match.png"
          alt="풋살 배경"
          fluid
        />
        <DateCarousel
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="mt-4">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : matches.length === 0 ? (
            <Alert variant="info" className="text-center">
              이 날에 등록된 경기가 없습니다.
            </Alert>
          ) : (
            <Row>
              {matches.map((match) => (
                <Col key={match.match_id} xs={12}>
                  <MatchCard match={match} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchListPage;
