import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, Check, X, Calendar, Clock, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { TextEffect } from '@/components/ui/text-effect'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.8,
            },
        },
    },
}

const TodoApp = () => {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [newTodoDescription, setNewTodoDescription] = useState('')
    const [newTodoDueDate, setNewTodoDueDate] = useState('')
    const [newTodoPriority, setNewTodoPriority] = useState('medium')
    const [editingId, setEditingId] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [editingDescription, setEditingDescription] = useState('')
    const [filter, setFilter] = useState('all')
    const [isLoaded, setIsLoaded] = useState(false)

    // Load todos from localStorage on component mount
    useEffect(() => {
        try {
            const savedTodos = localStorage.getItem('taskhive-todos')
            if (savedTodos && savedTodos !== 'undefined') {
                const parsedTodos = JSON.parse(savedTodos)
                console.log('Loaded todos from localStorage:', parsedTodos)
                if (Array.isArray(parsedTodos)) {
                    setTodos(parsedTodos)
                }
            }
        } catch (error) {
            console.error('Error loading todos from localStorage:', error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Save todos to localStorage whenever todos change (but only after initial load)
    useEffect(() => {
        if (isLoaded) {
            try {
                console.log('Saving todos to localStorage:', todos)
                localStorage.setItem('taskhive-todos', JSON.stringify(todos))
            } catch (error) {
                console.error('Error saving todos to localStorage:', error)
            }
        }
    }, [todos, isLoaded])

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const todo = {
                id: Date.now(),
                text: newTodo.trim(),
                description: newTodoDescription.trim(),
                completed: false,
                createdAt: new Date().toISOString(),
                dueDate: newTodoDueDate || null,
                priority: newTodoPriority,
            }
            console.log('Adding new todo:', todo)
            const updatedTodos = [...todos, todo]
            setTodos(updatedTodos)
            console.log('Updated todos array:', updatedTodos)
            setNewTodo('')
            setNewTodoDescription('')
            setNewTodoDueDate('')
            setNewTodoPriority('medium')
        }
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const startEditing = (id, text, description) => {
        setEditingId(id)
        setEditingText(text)
        setEditingDescription(description || '')
    }

    const saveEdit = () => {
        setTodos(todos.map(todo =>
            todo.id === editingId 
                ? { ...todo, text: editingText.trim(), description: editingDescription.trim() }
                : todo
        ))
        setEditingId(null)
        setEditingText('')
        setEditingDescription('')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditingText('')
        setEditingDescription('')
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-500'
            case 'medium': return 'bg-yellow-500'
            case 'low': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    const isOverdue = (dueDate) => {
        if (!dueDate) return false
        return new Date(dueDate) < new Date()
    }

    const filteredTodos = todos.filter(todo => {
        return filter === 'all' || 
               (filter === 'active' && !todo.completed) || 
               (filter === 'completed' && todo.completed)
    })

    const completedCount = todos.filter(todo => todo.completed).length
    const totalCount = todos.length

    console.log('Rendering TodoApp with todos:', todos)
    console.log('Filtered todos:', filteredTodos)

    return (
        <section className="py-6 relative z-10">
            <div className="mx-auto max-w-4xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="inline-block text-white">Your Personal</span>
                        <br />
                        <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Todo Manager
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-white/80 font-medium">
                        Stay organized and boost your productivity. Create, manage, and track your tasks with ease.
                    </p>
                    <div className="mt-4 text-white/60 text-sm">
                        Total todos: {todos.length} | Filtered todos: {filteredTodos.length}
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    {/* Add New Todo Form */}
                    <div className="mb-8">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    placeholder="Add a new task..."
                                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                                />
                                <Button 
                                    onClick={addTodo}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-6 py-3 rounded-xl"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Task
                                </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <textarea
                                    value={newTodoDescription}
                                    onChange={(e) => setNewTodoDescription(e.target.value)}
                                    placeholder="Description (optional)..."
                                    rows="2"
                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                                />
                                <input
                                    type="date"
                                    value={newTodoDueDate}
                                    onChange={(e) => setNewTodoDueDate(e.target.value)}
                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                />
                                <select
                                    value={newTodoPriority}
                                    onChange={(e) => setNewTodoPriority(e.target.value)}
                                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                                >
                                    <option value="low" className="bg-gray-800">Low Priority</option>
                                    <option value="medium" className="bg-gray-800">Medium Priority</option>
                                    <option value="high" className="bg-gray-800">High Priority</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stats and Controls */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="flex items-center gap-6 text-white/80">
                                <span className="text-sm">
                                    {completedCount} of {totalCount} completed
                                </span>
                                <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                                        style={{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                        filter === 'all' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter('active')}
                                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                        filter === 'active' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    Active
                                </button>
                                <button
                                    onClick={() => setFilter('completed')}
                                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                        filter === 'completed' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Todo List */}
                    <div className="space-y-3">
                        {filteredTodos.length === 0 ? (
                            <div className="text-center py-12 text-white/60">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                                    <Check className="w-8 h-8" />
                                </div>
                                <p className="text-lg">
                                    {filter === 'completed' ? 'No completed tasks yet' :
                                     filter === 'active' ? 'No active tasks' : 'No tasks yet'}
                                </p>
                                <p className="text-sm mt-2">
                                    {filter === 'all' && 'Add a task above to get started!'}
                                </p>
                            </div>
                        ) : (
                            filteredTodos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className={`bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 ${
                                        todo.completed ? 'opacity-75' : ''
                                    }`}
                                >
                                    {editingId === todo.id ? (
                                        // Edit Mode
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                            />
                                            <textarea
                                                value={editingDescription}
                                                onChange={(e) => setEditingDescription(e.target.value)}
                                                placeholder="Description..."
                                                rows="2"
                                                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={saveEdit}
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    <Check className="w-4 h-4 mr-1" />
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={cancelEdit}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-white hover:bg-white/10"
                                                >
                                                    <X className="w-4 h-4 mr-1" />
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Display Mode
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => toggleComplete(todo.id)}
                                                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    todo.completed 
                                                        ? 'bg-green-500 border-green-500' 
                                                        : 'border-white/40 hover:border-white/60'
                                                }`}
                                            >
                                                {todo.completed && <Check className="w-3 h-3 text-white" />}
                                            </button>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h3 className={`text-white font-medium ${
                                                            todo.completed ? 'line-through opacity-60' : ''
                                                        }`}>
                                                            {todo.text}
                                                        </h3>
                                                        {todo.description && (
                                                            <p className="text-white/70 text-sm mt-1">{todo.description}</p>
                                                        )}
                                                        
                                                        <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                                                            <div className="flex items-center gap-1">
                                                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(todo.priority)}`} />
                                                                <span className="capitalize">{todo.priority}</span>
                                                            </div>
                                                            
                                                            {todo.dueDate && (
                                                                <div className={`flex items-center gap-1 ${
                                                                    isOverdue(todo.dueDate) && !todo.completed ? 'text-red-400' : ''
                                                                }`}>
                                                                    <Calendar className="w-3 h-3" />
                                                                    <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                                                                    {isOverdue(todo.dueDate) && !todo.completed && (
                                                                        <span className="text-red-400 font-medium">(Overdue)</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                            
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => startEditing(todo.id, todo.text, todo.description)}
                                                            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteTodo(todo.id)}
                                                            className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TodoApp