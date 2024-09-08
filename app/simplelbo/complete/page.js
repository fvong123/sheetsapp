import Image from 'next/image';
import Link from 'next/link';

export default function CongratulationsPage() {
  return (
    <div className="flex flex-col items-center h-screen bg-base-100 pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">
          Congratulations!
        </h1>
        <p className="text-xl mb-8 text-base-content">
          You have successfully completed the course!
        </p>
        <div className="mb-8">
          <Image
            src="https://i.pinimg.com/originals/f8/ce/23/f8ce2320cc8c8d361841c3923b61d28c.gif"
            alt="Celebration"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <p className="text-lg mb-8 text-base-content">
          Great job on mastering the fundamentals of LBO modeling!
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}