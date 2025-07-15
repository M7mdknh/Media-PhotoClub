import { useTranslation } from 'react-i18next';

const BlogPost = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">BlogPost</h1>
        <p className="text-center text-gray-600 dark:text-gray-300">BlogPost page coming soon...</p>
      </div>
    </div>
  );
};

export default BlogPost;
