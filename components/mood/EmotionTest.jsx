// components/mood/EmotionTest.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { testQuestions } from '@/lib/constants';

const MAX_SCORE = 40; // 10 questions * max score 4

export default function EmotionTest() {
    const [stage, setStage] = useState('intro'); // 'intro', 'questions', 'results'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [testAnswers, setTestAnswers] = useState(new Array(testQuestions.length).fill(null));
    const [totalScore, setTotalScore] = useState(0);

    const question = testQuestions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;

    const handleStartTest = () => {
        setCurrentQuestionIndex(0);
        setTestAnswers(new Array(testQuestions.length).fill(null));
        setTotalScore(0);
        setStage('questions');
    };

    const handleSelectAnswer = (answerIndex) => {
        const newAnswers = [...testAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setTestAnswers(newAnswers);
    };

    const handleNext = () => {
        if (testAnswers[currentQuestionIndex] === null) return;

        if (isLastQuestion) {
            calculateResults();
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    
    // Cập nhật trạng thái nút Next/Prev khi câu hỏi/câu trả lời thay đổi
    const isNextDisabled = testAnswers[currentQuestionIndex] === null;
    const isPrevDisabled = currentQuestionIndex === 0;

    const calculateResults = () => {
        let score = 0;
        testAnswers.forEach((answerIndex, questionIndex) => {
            if (answerIndex !== null) {
                score += testQuestions[questionIndex].answers[answerIndex].score;
            }
        });
        setTotalScore(score);
        setStage('results');
    };

    const getResultInterpretation = (score) => {
        let icon, title, description, recommendations;
        
        if (score <= 10) {
            icon = '😊'; title = 'Sức khỏe tâm thần tốt';
            description = 'Bạn đang có tình trạng cảm xúc và sức khỏe tâm thần khá tốt. Hãy tiếp tục duy trì lối sống lành mạnh!';
            recommendations = `
                <h4>Gợi ý cho bạn:</h4>
                <ul>
                    <li>Tiếp tục duy trì thói quen tốt hiện tại</li>
                    <li>Tham gia các hoạt động xã hội để kết nối</li>
                    <li>Luyện tập thể dục đều đặn</li>
                    <li>Dành thời gian cho sở thích cá nhân</li>
                </ul>
            `;
        } else if (score <= 20) {
            icon = '😐'; title = 'Có dấu hiệu căng thẳng nhẹ';
            description = 'Bạn có một số dấu hiệu căng thẳng và stress. Đây là mức độ bình thường nhưng cần chú ý.';
            recommendations = `
                <h4>Gợi ý cho bạn:</h4>
                <ul>
                    <li>Thực hành kỹ thuật thư giãn như thiền, yoga</li>
                    <li>Cải thiện chất lượng giấc ngủ</li>
                    <li>Chia sẻ cảm xúc với bạn bè, người thân</li>
                    <li>Giảm thiểu stress từ công việc</li>
                    <li>Tham gia các hoạt động giải trí</li>
                </ul>
            `;
        } else if (score <= 30) {
            icon = '😔'; title = 'Có dấu hiệu lo âu hoặc trầm cảm';
            description = 'Bạn đang có dấu hiệu của lo âu hoặc trầm cảm. Bạn nên cân nhắc tìm kiếm sự hỗ trợ.';
            recommendations = `
                <h4>Gợi ý cho bạn:</h4>
                <ul>
                    <li>Nói chuyện với người thân hoặc bạn bè tin tưởng</li>
                    <li>Cân nhắc gặp bác sĩ hoặc chuyên gia tâm lý</li>
                    <li>Tham gia nhóm hỗ trợ cộng đồng</li>
                    <li>Tránh tự cô lập bản thân</li>
                    <li>Sử dụng tính năng "Trò chuyện hỗ trợ" của Hope Map</li>
                </ul>
            `;
        } else {
            icon = '😢'; title = 'Cần sự hỗ trợ chuyên nghiệp';
            description = 'Kết quả cho thấy bạn đang gặp khó khăn đáng kể. Hãy tìm kiếm sự giúp đỡ chuyên nghiệp ngay.';
            recommendations = `
                <h4>Hành động khẩn cấp:</h4>
                <ul>
                    <li><strong>Liên hệ chuyên gia tâm lý hoặc bác sĩ ngay</strong></li>
                    <li>Gọi đường dây nóng: 1800 6606 (miễn phí)</li>
                    <li>Chia sẻ với người thân ngay lập tức</li>
                    <li>Đánh dấu "Cần giúp đỡ" trên bản đồ</li>
                    <li>Trong trường hợp khẩn cấp, gọi 115</li>
                </ul>
            `;
        }
        return { icon, title, description, recommendations };
    };

    const { icon, title, description, recommendations } = getResultInterpretation(totalScore);

    return (
        <>
            {stage === 'intro' && (
                <div id="testIntro" className="test-intro">
                    <div className="test-description">
                        <h3>Về bài test này</h3>
                        <p>Bài test gồm 10 câu hỏi giúp bạn hiểu rõ hơn về tình trạng cảm xúc hiện tại. Hãy trả lời trung thực để nhận được kết quả chính xác nhất.</p>
                        <p><strong>Lưu ý:</strong> Đây không phải là công cụ chẩn đoán y khoa. Nếu bạn đang gặp vấn đề nghiêm trọng, hãy tìm kiếm sự giúp đỡ chuyên nghiệp.</p>
                    </div>
                    <button className="btn-primary" onClick={handleStartTest}>Bắt đầu test</button>
                </div>
            )}

            {stage === 'questions' && (
                <div id="testQuestions">
                    <div className="test-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <p className="progress-text">Câu <span id="currentQuestion">{currentQuestionIndex + 1}</span> / {testQuestions.length}</p>
                    </div>
                    <div className="question-container" id="questionContainer">
                        <h3 className="question-text" id="questionText">{question.question}</h3>
                        <div className="answer-options" id="answerOptions">
                            {question.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`answer-option ${testAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
                                    onClick={() => handleSelectAnswer(index)}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="test-navigation">
                        <button className="btn-cancel" id="prevBtn" onClick={handlePrev} disabled={isPrevDisabled}>Câu trước</button>
                        <button className="btn-primary" id="nextBtn" onClick={handleNext} disabled={isNextDisabled}>
                            {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo'}
                        </button>
                    </div>
                </div>
            )}

            {stage === 'results' && (
                <div id="testResults">
                    <div className="test-result-card">
                        <div className="result-icon">{icon}</div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className="result-score">
                            Điểm: <span>{totalScore}</span>/{MAX_SCORE}
                        </div>
                        <div className="result-recommendations" dangerouslySetInnerHTML={{ __html: recommendations }}></div>
                        <button className="btn-primary" onClick={handleStartTest}>Làm lại test</button>
                    </div>
                </div>
            )}
        </>
    );
}