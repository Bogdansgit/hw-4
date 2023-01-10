import React, { useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import "./style.scss";
import { postsData } from "../../api";
import { ReactComponent as AddPostIcon } from "../../images/addPost.svg";
import Popup from "../../components/Popup";
import notify from "../../utils/notification.helpers";

function Posts() {
	const [posts, setPosts] = useState([...postsData]);
	const [editPostId, setEditPostId] = useState('');
	const [editPostTitle, setEditPostTitle] = useState('');
	const [editPostDescription, setEditPostDescription] = useState('');
	const [popup, setPopup] = useState(false);
	const [editPopup, setEditPopup] = useState(false);

	const handleAddPosts = (e) => {
		e.preventDefault();
		setPopup(true);
	}

	const removePosts = (e, id) => {
		e.preventDefault();
		setPosts(posts.filter(post => post.id !== id));
		notify('Post succesfully deleted!');
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const id = posts.length + 1;
		const title = e.target[0].value;
		const description = e.target[1].value;

		setPosts([...posts, { id, title, description }]);
		e.target[0].value = '';
		e.target[1].value = '';

		notify('🦄 Post succesfully created!');
		setPopup(false);
	}

	const handleEditedPostSubmit = (e, title, description) => {
		e.preventDefault();

		setPosts([ ...posts.filter(post => post.id !== editPostId 
			), {id: editPostId, title, description}
		]);

		setEditPopup(false);
		notify('🦄 Post succesfully edited!');
	}

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'title') {setEditPostTitle(value)}
		if (name === 'desc') {setEditPostDescription(value)}
	}

	const editPosts = (e, id, title, description) => {
		e.preventDefault();

		setEditPopup(true);
		setEditPostTitle(title);
		setEditPostDescription(description);
		setEditPostId(id);
	}

	return (
		<div className="posts">
			<div className="posts__top-line">
				<h3>Posts</h3>
				<div className="add" onClick={handleAddPosts}><AddPostIcon /></div>

			</div>
			<ul className="posts-list">
				{
					posts.map(post => (
						<li key={post.id}>
							<div className="posts-box">
								<h4 >{post.title}</h4>
								<p>{post.description}</p>
							</div>
							<div className="icons-box">
								<div className="edit" onClick={(e) => editPosts(e, post.id, post.title, post.description)}><EditIcon /></div>
								<div className="remove" onClick={(e) => removePosts(e, post.id)}><DeleteIcon /></div>
							</div>
						</li>
					))
				}
			</ul>
			<Popup trigger={popup} setTrigger={setPopup}>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Post Title" name={'title'} />
					<input type="text" placeholder="Post description" name={'desc'} />
					<button type='submit'>create new post</button>
				</form>
			</Popup>
			<Popup trigger={editPopup} setTrigger={setEditPopup}>
				<form onSubmit={(e) => handleEditedPostSubmit( e, editPostTitle, editPostDescription)}>
					<input onChange={handleChange} type="text" placeholder="Post Title" name={'title'} value={editPostTitle} />
					<input onChange={handleChange} type="text" placeholder="Post description" name={'desc'} value={editPostDescription} />
					<button type='submit'>Edit post</button>
				</form>
			</Popup>
		</div>
	)
};

export default Posts;