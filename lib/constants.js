// lib/constants.js
export const defaultConfig = {
    app_title: '🗺️ Hope Map',
    app_subtitle: 'Bản Đồ Hy Vọng',
    app_quote: '"Khi bạn cảm thấy lạc lõng, hãy biết rằng vẫn có ánh sáng ở gần bạn — Hope Map sẽ dẫn đường."',
    map_title: '🗺️ Bản đồ hỗ trợ',
    register_title: '📝 Đăng ký dịch vụ',
    mood_title: '😊 Theo dõi tâm trạng',
    chat_title: '💬 Trò chuyện hỗ trợ',
    story_title: '🧠 Test cảm xúc và sức khỏe tâm thần',
    footer_tagline: 'Kết nối - Chia sẻ - Hồi phục',
    background_gradient_start: '#667eea',
    background_gradient_end: '#764ba2',
    primary_color: '#667eea',
    text_color: '#333333',
    button_color: '#667eea'
};

// File: '@/lib/constants.js'

export const testQuestions = [
    // 1. Core Depression/Anhedonia
    {
        question: "Trong 2 tuần qua, bạn có thường xuyên cảm thấy buồn bã hoặc tuyệt vọng không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 2. Anhedonia (Loss of interest)
    {
        question: "Trong 2 tuần qua, bạn có thường xuyên cảm thấy mất hứng thú hoặc niềm vui khi làm việc không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 3. Sleep disturbance
    {
        question: "Bạn có gặp vấn đề về giấc ngủ (ngủ quá ít hoặc ngủ quá nhiều) không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 4. Energy/Fatigue
    {
        question: "Bạn có cảm thấy mệt mỏi, thiếu năng lượng không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 5. Appetite/Weight changes
    {
        question: "Bạn có bị giảm hoặc tăng cân đáng kể, hoặc thay đổi cảm giác thèm ăn không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 6. Guilt/Worthlessness
    {
        question: "Bạn có cảm thấy bản thân là người thất bại hoặc cảm thấy tồi tệ về bản thân không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 7. Concentration
    {
        question: "Bạn có gặp khó khăn khi tập trung vào mọi việc (như đọc sách, xem TV) không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 8. Motor activity (Psychomotor Retardation or Agitation)
    {
        question: "Bạn có cảm thấy chậm chạp hoặc bồn chồn hơn bình thường không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 9. Anxiety/Worry
    {
        question: "Bạn có cảm thấy lo lắng, căng thẳng hoặc không thể ngừng lo lắng không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
    // 10. Suicidal Ideation (Critical Question)
    {
        question: "Bạn có nghĩ đến việc tự làm hại bản thân hoặc kết thúc cuộc đời không?",
        answers: [
            { text: "Không bao giờ", score: 0 },
            { text: "Vài ngày", score: 1 },
            { text: "Hơn nửa số ngày", score: 2 },
            { text: "Hầu như mỗi ngày", score: 3 },
        ]
    },
];

export const chatResponses = {
    greeting: ['Xin chào! Tôi rất vui được trò chuyện với bạn.', 'Chào bạn!'],
    sad: ['Tôi hiểu bạn đang cảm thấy buồn. Điều đó hoàn toàn bình thường.'],
    // ...
};