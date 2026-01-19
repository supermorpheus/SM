import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
import { currentUser, newMembers, stats } from '../../data/mockData'
import '../../styles/dashboard.css'

// V2: Complete profile, no upcoming events
function DashboardV2() {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'super': return 'status-super'
      case 'active': return 'status-active'
      default: return 'status-basic'
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  // Simulated complete user profile
  const completeUser = {
    ...currentUser,
    profileCompletion: 100,
    status: 'super'
  }

  // No events
  const noEvents = []

  return (
    <>
      <StatusBar />
      <div className="page-content dashboard-page">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-greeting">Welcome, {completeUser.firstName}!</h1>
            <p className="welcome-subtitle">
              {stats.newMembersThisWeek} new people joined this week
            </p>
          </div>
        </div>

        {/* Profile Complete Card - Different design for complete profile */}
        <div className="profile-completion-card profile-complete">
          <div className="completion-header">
            <div className="completion-info">
              <h3>Profile Complete!</h3>
              <p>You're a Super member with full access</p>
            </div>
            <div className="completion-badge-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>
          <div className="completion-progress">
            <div
              className="completion-bar"
              style={{ width: '100%' }}
            />
          </div>
          <div className="completion-actions">
            <Link to="/profile" className="completion-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              View Profile
            </Link>
            <span className="super-badge">Super Member</span>
          </div>
        </div>

        {/* New Members Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">New Members</h2>
            <Link to="/members" className="section-link">See all</Link>
          </div>
          <div className="new-members-scroll">
            {newMembers.map((member) => (
              <div key={member.id} className="new-member-card">
                <div className="new-member-avatar">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.firstName} />
                  ) : (
                    <span>{getInitials(member.firstName, member.lastName)}</span>
                  )}
                  <span className={`member-status-dot ${getStatusBadgeClass(member.status)}`} />
                </div>
                <span className="new-member-name">{member.firstName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* No Upcoming Events - Empty State */}
        {noEvents.length === 0 && (
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Upcoming Events</h2>
            </div>
            <div className="empty-events-card">
              <div className="empty-events-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="empty-events-title">No upcoming events</h3>
              <p className="empty-events-text">Check back later for community events and gatherings</p>
            </div>
          </div>
        )}

        {/* Browse Members Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Community</h2>
            <span className="member-count">{stats.totalMembers}</span>
          </div>

          {/* Search Bar */}
          <Link to="/members" className="search-bar-link">
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>Search by name, passion, location</span>
            </div>
          </Link>

          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/members" className="quick-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Browse Community
            </Link>
            <Link to="/members?tab=services" className="quick-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              Community Businesses
            </Link>
          </div>
        </div>

      </div>
      <FloatingMenu />
    </>
  )
}

export default DashboardV2
