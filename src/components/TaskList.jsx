import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onStatusChange }) => {
  if (!tasks.length)
    return (
      <div style={{ textAlign: 'center', color: '#64748b', margin: '40px 0', fontSize: 15, fontWeight: 500 }}>
        No tasks found
      </div>
    );
  return (
    <div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={status => onStatusChange(task.id, status)}
        />
      ))}
    </div>
  );
};

export default TaskList;
