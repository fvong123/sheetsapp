import Image from 'next/image';

export default function CongratulationsPage() {
  return (
    <div className="flex h-screen bg-base-100">
      <div className="m-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">
          Congratulations!
        </h1>
        <p className="text-xl mb-8 text-base-content">
          You have successfully completed the course!
        </p>
        <div className="mb-8">
          <Image
            src="/celebration.gif"
            alt="Celebration"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <p className="text-lg text-base-content">
          Great job on mastering the fundamentals of LBO modeling!
        </p>
      </div>
    </div>
  );
}