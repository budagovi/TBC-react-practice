import style from './ReviewsContent.module.css';
import Review from './Review';

const ReviewsContent = () => {
  return (
    <div className={style.wrapper}>
      <h1>Reviews</h1>
      <Review
        author="John Smith"
        date="July 12, 2023"
        rating={4.5}
      >
        My recent stay at Hotel Aurora was exceptional. The staff was courteous, the room was clean and comfortable, and the amenities were excellent. The location was convenient, with easy access to nearby attractions. Overall, a fantastic experience that exceeded my expectations.
      </Review>
      <Review
        author="Anna Johnson"
        date="September 5, 2023"
        rating={5.0.toFixed(1)}
      >
        I cannot say enough good things about Hotel Aurora. From the moment I arrived, I was impressed by the attention to detail and the warm hospitality of the staff. The room was beautifully decorated, and the views from the balcony were stunning. I highly recommend this hotel to anyone looking for a luxurious and memorable stay.      </Review>
      <Review
        author="David Wilson"
        date="November 20, 2023"
        rating={4.8}
      >
        My stay at Hotel Aurora was nothing short of wonderful. The check-in process was smooth, and the staff went above and beyond to ensure my comfort throughout my stay. The room was spacious and well-appointed, and the hotel's amenities were top-notch. I would definitely stay here again in the future.      </Review>
    </div>
  )
}

export default ReviewsContent;