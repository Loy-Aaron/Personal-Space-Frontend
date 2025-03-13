import { useEffect, useState } from "react"
import api from "../config/axios.js"
import useAlertStore from "../store/alertStore.js"
import SubmitButton from "../components/SubmitButton.jsx"
import { X, SquarePlus, Trash2, SquarePen } from "lucide-react"
import useLoadingStore from '../store/loadingStore.js'

const Blogs = () => {
    const { setAlert } = useAlertStore()
    const { setIsLoading } = useLoadingStore()

    const [blogs, setBlogs] = useState([])

    const [showCreateBlog, setShowCreateBlog] = useState(false)

    const [showConfirmDeletion, setShowConfirmDeletion] = useState(false)

    const [showEditBlog, setShowEditBlog] = useState(false)

    const [editBlog, setEditBlog] = useState({
        bid: '',
        title: '',
        content: ''
    })

    const [newBlog, setNewBlog] = useState({
        title: '',
        content: ''
    })

    const [isCreateSubmitBtnDisabled, setIsCreateSubmitBtnDisabled] = useState((true))

    const [isEditSubmitBtnDisabled, setIsEditSubmitBtnDisabled] = useState((true))

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true)
            try {
                const response = await api.get('/blogs')

                const blogs = response.data.blogs

                setBlogs(blogs)

            } catch (error) {
                setAlert('Network Error', 'error')
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    useEffect(() => {
        setIsCreateSubmitBtnDisabled(!newBlog.title.trim() || !newBlog.content.trim())
    }, [newBlog])
    

    useEffect(() => {
        setIsCreateSubmitBtnDisabled(!editBlog.title.trim() || !editBlog.content.trim())
    }, [editBlog])
    
    const handleInputChangeNewBlog = (e) => {
        setNewBlog({
            ...newBlog,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitNewBlog = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await api.post('/blogs', newBlog)

            setBlogs([
                ...blogs,
                response.data.newBlog
            ])

            setShowCreateBlog(false)

            setAlert('New Blog Created', 'success')

        } catch (error) {
            console.error(error)
            setShowCreateBlog(false)

            setAlert('Failed To  Create New Blog', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteBlog = async (bid) => {
        setIsLoading(true)
        try {
            await api.delete(`/blogs/${bid}`)

            setBlogs(blogs.filter(blog => blog._id !== bid))
            setAlert('Blog Deleted', 'success')
        } catch (error) {
            setAlert('Failed To Delete Blog')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChangeEditBlog = (e) => {
        setEditBlog({
            ...editBlog,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitEditedBlog = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const bid = editBlog.bid
            const response = await api.put(`/blogs/${bid}`, { title: editBlog.title, content: editBlog.content })

            const updatedBlog = response.data.updatedBlog

            setBlogs(blogs.map(blog => blog._id === bid ? updatedBlog : blog))
            setAlert('Blog Updated', 'success')

        } catch (error) {
            setAlert('Failed To Update Blog', 'error')
        } finally {
            setShowEditBlog(false)
            setIsLoading(false)
        }
    }

    const handleDeleteAllBlogs = async () => {
        setIsLoading(true)
        try {
            await api.delete('/blogs')

            setBlogs([])
            setAlert('All Blogs Deleted', 'success')

        } catch (error) {
            setAlert('Failed To Delete All Blogs', 'error')
        } finally {
            setShowConfirmDeletion(false)
            setIsLoading(false)
        }
    }
    return (
        <>
            {blogs.length === 0 ?
                <div
                    className="flex justify-center"
                >
                    <p
                        className="text-gray-500"
                    >
                        No entries found.{' '}
                        <span
                            className="text-blue-400 font-bold hover:underline hover:cursor-pointer"
                            onClick={() => setShowCreateBlog(true)}
                        >
                            Create new blog
                        </span>
                    </p>
                </div> :
                <div
                    className="px-8"
                >
                    <div className="flex gap-3 items-baseline">
                        <p className="text-6xl">Blogs</p>
                        <SquarePlus
                            className="w-5 h-5 hover:text-gray-500 hover:cursor-pointer"
                            onClick={() => setShowCreateBlog(true)}
                        />
                        <Trash2
                            className="w-5 h-5 hover:text-gray-500 hover:cursor-pointer"
                            onClick={() => setShowConfirmDeletion(true)}
                        />
                    </div>
                    <div
                        className="mt-10 flex flex-col gap-5">
                        {blogs.map(blog =>
                            <section
                                key={blog._id}
                                className="border-b border-gray-500"
                            >
                                <div className="flex gap-3 items-baseline">
                                    <p className="text-3xl">
                                        {blog.title}
                                    </p>
                                    <SquarePen
                                        className="w-5 h-5 hover:cursor-pointer hover:text-gray-500"
                                        onClick={() => { setShowEditBlog(true); setEditBlog({ bid: blog._id, title: blog.title, content: blog.content }) }}
                                    />
                                    <Trash2
                                        className="w-5 h-5 hover:cursor-pointer hover:text-gray-500"
                                        onClick={() => handleDeleteBlog(blog._id)}
                                    />
                                </div>
                                <p
                                    className="text-xl mt-4 indent-10 w-full break-words whitespace-pre-wrap"
                                >
                                    {blog.content}
                                </p>
                            </section>)}
                    </div>
                </div>
            }

            {showCreateBlog &&
                <div
                    className="fixed top-1/2 left-1/2 -translate-1/2 w-9/10 p-4 rounded-2xl bg-gray-700"
                >
                    <X
                        className="absolute right-4 hover:cursor-pointer hover:text-gray-400"
                        onClick={() => setShowCreateBlog(false)}
                    />
                    <p
                        className='text-3xl font-bold text-amber-50'
                    >
                        New Blog
                    </p>
                    <form
                        className="mt-4 flex flex-col gap-3"
                        onSubmit={handleSubmitNewBlog}>
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter Title"
                                className="w-sm border-2 border-slate-950 rounded-xl outline-none focus:border-blue-500 py-2 px-4 text-slate-950 bg-gray-400 text-2xl"
                                onChange={handleInputChangeNewBlog}
                            />
                        </div>
                        <div>
                            <textarea
                                name="content"
                                rows={10}
                                className="custom-textarea w-full border-2 border-slate-950 rounded-xl outline-none focus:border-blue-500 py-2 px-4 text-slate-950 bg-gray-400"
                                onChange={handleInputChangeNewBlog}
                            >
                            </textarea>
                        </div>
                        <SubmitButton
                            isDisabled={isCreateSubmitBtnDisabled}
                            width='w-max'
                        >
                            Save
                        </SubmitButton>
                    </form>
                </div>}

            {showEditBlog &&
                <div
                    className="fixed top-1/2 left-1/2 -translate-1/2 w-9/10 p-4 rounded-2xl bg-gray-700"
                >
                    <X
                        className="absolute right-4 hover:cursor-pointer hover:text-gray-400"
                        onClick={() => setShowEditBlog(false)}
                    />
                    <p
                        className='text-3xl font-bold text-amber-50'
                    >
                        Edit Blog
                    </p>
                    <form
                        className="mt-4 flex flex-col gap-3"
                        onSubmit={handleSubmitEditedBlog}>
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter Title"
                                value={editBlog.title}
                                className="w-sm border-2 border-slate-950 rounded-xl outline-none focus:border-blue-500 py-2 px-4 text-slate-950 bg-gray-400 text-2xl"
                                onChange={handleInputChangeEditBlog}
                            />
                        </div>
                        <div>
                            <textarea
                                name="content"
                                rows={10}
                                value={editBlog.content}
                                className="custom-textarea w-full border-2 border-slate-950 rounded-xl outline-none focus:border-blue-500 py-2 px-4 text-slate-950 bg-gray-400"
                                onChange={handleInputChangeEditBlog}
                            >
                            </textarea>
                        </div>
                        <SubmitButton
                            isDisabled={isEditSubmitBtnDisabled}
                            width='w-max'
                        >
                            Save
                        </SubmitButton>
                    </form>
                </div>}
            {showConfirmDeletion &&
                <div className="fixed top-1/2 left-1/2 -translate-1/2 bg-gray-700 p-4 rounded-xl">
                    <p className="text-2xl mb-3">Do you want to delete all blogs?</p>
                    <div className="w-full flex gap-3 justify-center">
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 rounded-xl py-2 px-4"
                            onClick={handleDeleteAllBlogs}
                        >Confirm</button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 rounded-xl py-2 px-4"
                            onClick={() => setShowConfirmDeletion(false)}
                        >Cancel</button>
                    </div>
                </div>}
        </>
    )
}

export default Blogs