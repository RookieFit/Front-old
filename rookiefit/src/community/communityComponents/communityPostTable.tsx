interface Post {
    id: number;
    author: string;
    date: string;
    title: string;
}

interface CommunityPostTableProps {
    posts: Post[];
}

const CommunityPostTable = ({ posts }: CommunityPostTableProps) => (
    <div className="community-posts">
        <table className="community-posts-title">
            <thead>
                <tr>
                    <th>제목</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <table className="community-posts-date">
            <thead>
                <tr>
                    <th>작성 날짜</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <table className="community-posts-author">
            <thead>
                <tr>
                    <th>작성자</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.author}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default CommunityPostTable;
