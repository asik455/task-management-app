import React, { useState, useEffect } from 'react';
// ...existing code...
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'tasks'), 
      where('userId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by creation time manually since we aren't creating a composite index right now
      tasksData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTasks(tasksData);
    });
    
    return () => unsubscribe();
  }, [user]);

  const handleAddTask = async (task) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, { status });
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'All' ? true : task.status === filter);

  return (
    <div className="page-transition" style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', backgroundImage: 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.1), transparent 40%)' }}>
      <Navbar />
      <main style={{ maxWidth: 960, margin: '48px auto', width: '92%' }}>
        <TaskForm onAdd={handleAddTask} />
        
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
          {['All', 'Planned', 'In Progress', 'Complete'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filter === tab ? '#3b82f6' : '#e2e8f0',
                background: filter === tab ? '#eff6ff' : '#ffffff',
                color: filter === tab ? '#1d4ed8' : '#64748b',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: filter === tab ? '0 2px 4px rgba(59, 130, 246, 0.1)' : '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} />
      </main>
    </div>
  );
};

export default Dashboard;
